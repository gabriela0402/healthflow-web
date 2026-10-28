import type { AppointmentProfessionalResponse } from "../../types/appointment";
import type { ProfessionalAvailability } from "../PatientBooking/PatientBooking.types";
import { mapAppointment } from "../ProfessioanlAppointments/ProfessionalAppointments.utils";
import type { ScheduleAppointment } from "./ProfessionalSchedule.types";

export const SLOT_HEIGHT = 92;
export const DEFAULT_SLOT_MINUTES = 30;

export function toDateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function mapScheduleAppointment(
  item: AppointmentProfessionalResponse,
): ScheduleAppointment {
  const base = mapAppointment(item);

  return {
    id: base.id,
    date: base.date,
    dateKey: toDateKey(base.date),
    time: base.time,
    patient: base.patient,
    code: `#AG-${String(base.id).padStart(4, "0")}`,
    status: base.status,
  };
}

export function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function getAppointmentTop(date: Date, startHour: number) {
  const minutes = (date.getHours() - startHour) * 60 + date.getMinutes();
  return (minutes / 60) * SLOT_HEIGHT + 8;
}

const DAY_INDEX: Record<string, number> = {
  dom: 0, sun: 0, seg: 1, mon: 1, ter: 2, tue: 2,
  qua: 3, wed: 3, qui: 4, thu: 4, sex: 5, fri: 5, sab: 6, sat: 6,
};

const DAY_NAMES = [
  "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
];

export function toDayIndex(value: number | string): number | null {
  if (typeof value === "number") return value;
  if (/^\d$/.test(value)) return Number(value);

  const key = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .slice(0, 3);

  return DAY_INDEX[key] ?? null;
}

export function formatAvailability(item: ProfessionalAvailability) {
  const index = toDayIndex(item.dayOfWeek);
  const name = index === null ? String(item.dayOfWeek) : DAY_NAMES[index];

  return {
    id: item.id,
    index: index ?? 9,
    label: `${name}: ${item.startTime.slice(0, 5)} às ${item.endTime.slice(0, 5)}`,
  };
}

export function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}