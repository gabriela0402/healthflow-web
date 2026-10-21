import type { AppointmentResponse } from "../../types/appointment";
import type {
  AppointmentStatus,
  PatientAppointment,
} from "./PatientAppointments.types";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "jan.", "fev.", "mar.", "abr.", "mai.", "jun.",
  "jul.", "ago.", "set.", "out.", "nov.", "dez.",
];

const STATUS_FROM_API: Record<
  AppointmentResponse["status"],
  AppointmentStatus
> = {
  Scheduled: "scheduled",
  Confirmed: "confirmed",
  Cancelled: "cancelled",
  Completed: "completed",
  NoShow: "noShow",
};

export function mapAppointment(
  item: AppointmentResponse,
): PatientAppointment {
  const date = new Date(item.scheduledAt);

  return {
    id: item.id,
    date,
    time: date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    professional: item.professionalName,
    specialty: item.specialty,
    status: STATUS_FROM_API[item.status] ?? "scheduled",
    notes: item.notes,
  };
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getStatusLabel(status: AppointmentStatus) {
  const labels: Record<AppointmentStatus, string> = {
    scheduled: "Agendado",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
    completed: "Concluído",
    noShow: "Não compareceu",
  };

  return labels[status];
}

export function getAppointmentCode(id: number) {
  return `#AG-${String(id).padStart(4, "0")}`;
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getWeekStart(date: Date) {
  const start = startOfDay(date);
  return addDays(start, -((start.getDay() + 6) % 7));
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatShortDate(date: Date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function getWeekdayLabel(date: Date) {
  return WEEKDAYS[date.getDay()];
}