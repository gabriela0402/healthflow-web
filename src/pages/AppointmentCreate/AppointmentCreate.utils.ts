import type { ProfessionalAvailability } from "../PatientBooking/PatientBooking.types";

const DAYS: Record<string, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
  domingo: 0, segunda: 1, "segunda-feira": 1,
  terca: 2, terça: 2, "terça-feira": 2,
  quarta: 3, "quarta-feira": 3,
  quinta: 4, "quinta-feira": 4,
  sexta: 5, "sexta-feira": 5,
  sabado: 6, sábado: 6,
};

function getDayNumber(day: number | string) {
  return typeof day === "number" ? day : DAYS[day.toLowerCase()];
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(total: number) {
  const hours = String(Math.floor(total / 60)).padStart(2, "0");
  const minutes = String(total % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function getTimeSlots(
  date: string,
  availabilities: ProfessionalAvailability[],
) {
  if (!date) return [];

  const selected = parseDate(date);
  const weekday = selected.getDay();
  const now = new Date();
  const isToday = selected.toDateString() === now.toDateString();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots: string[] = [];

  availabilities
    .filter((item) => getDayNumber(item.dayOfWeek) === weekday)
    .forEach((item) => {
      const end = toMinutes(item.endTime);

      for (
        let current = toMinutes(item.startTime);
        current < end;
        current += item.slotDurationInMinutes
      ) {
        if (!isToday || current > nowMinutes) slots.push(toTime(current));
      }
    });

  return Array.from(new Set(slots)).sort();
}

export function getTodayValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export type AvailableDay = { value: string; label: string };

export function getAvailableDays(
  availabilities: ProfessionalAvailability[],
  daysAhead = 60,
): AvailableDay[] {
  const weekdays = new Set(
    availabilities
      .map((item) => getDayNumber(item.dayOfWeek))
      .filter((day) => day !== undefined),
  );

  const days: AvailableDay[] = [];
  const today = new Date();

  for (let i = 0; i <= daysAhead; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);

    if (!weekdays.has(date.getDay())) continue;

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);
    const short = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date);

    days.push({
      value: `${date.getFullYear()}-${month}-${day}`,
      label: `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${short}`,
    });
  }

  return days.filter(
    (item) => getTimeSlots(item.value, availabilities).length > 0,
  );
}