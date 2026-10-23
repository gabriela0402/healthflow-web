import type { ProfessionalAvailability } from "../PatientBooking/PatientBooking.types";

const WEEKDAY_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const WEEKDAY_EN = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",
];

function toDayIndex(day: number | string): number {
  if (typeof day === "number") return day;
  const byName = WEEKDAY_EN.indexOf(day.toLowerCase());
  return byName >= 0 ? byName : Number(day);
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(totalMinutes: number): string {
  const h = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const m = String(totalMinutes % 60).padStart(2, "0");
  return `${h}:${m}`;
}

export function getNextAvailability(
  availabilities: ProfessionalAvailability[],
  now: Date = new Date(),
): string | null {
  if (availabilities.length === 0) return null;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (let offset = 0; offset <= 7; offset++) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);

    const candidates: number[] = [];

    for (const availability of availabilities) {
      if (toDayIndex(availability.dayOfWeek) !== date.getDay()) continue;

      const start = toMinutes(availability.startTime);
      const end = toMinutes(availability.endTime);
      const step = availability.slotDurationInMinutes;
      if (step <= 0) continue;

      for (let time = start; time + step <= end; time += step) {
        if (offset > 0 || time > nowMinutes) candidates.push(time);
      }
    }

    if (candidates.length > 0) {
      const label =
        offset === 0 ? "Hoje" : offset === 1 ? "Amanhã" : WEEKDAY_SHORT[date.getDay()];
      return `${label}, ${formatTime(Math.min(...candidates))}`;
    }
  }

  return null;
}