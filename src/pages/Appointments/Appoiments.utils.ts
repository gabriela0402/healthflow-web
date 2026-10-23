import type { AppointmentAdminResponse } from "../../types/appointment";
import type { AdminAppointment, AppointmentStatus } from "./Appointments.types";

const STATUS_FROM_API: Record<
  AppointmentAdminResponse["status"],
  AppointmentStatus
> = {
  Scheduled: "scheduled",
  Confirmed: "confirmed",
  Cancelled: "cancelled",
  Completed: "completed",
  NoShow: "noShow",
};

function getAge(dateOfBirth: string | null) {
  if (!dateOfBirth) return null;

  const birth = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hadBirthday) age -= 1;

  return age >= 0 ? age : null;
}

export function mapAppointment(item: AppointmentAdminResponse): AdminAppointment {
  const date = new Date(item.scheduledAt);
  const age = getAge(item.patientDateOfBirth);

  return {
    id: item.id,
    date,
    time: date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    patient: item.patientName,
    patientInfo: `${age !== null ? `${age} anos` : "Idade não informada"} • P${item.patientId}`,
    professionalId: item.professionalId,
    professional: item.professionalName,
    specialty: item.specialty,
    status: STATUS_FROM_API[item.status] ?? "scheduled",
  };
}

export function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
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

export const STATUS_COLORS: Record<AppointmentStatus, string> = {
  confirmed: "#4CAF91",
  scheduled: "#42A5F5",
  completed: "#98A2B3",
  cancelled: "#E57373",
  noShow: "#F4C95D",
};

export function formatShortDate(date: Date) {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function formatLongDate(date: Date) {
  const text = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getWeekRange(base: Date) {
  const start = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));

  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  return { start, end };
}

export function buildDonutGradient(counts: Record<AppointmentStatus, number>) {
  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  if (total === 0) return "#EEF0F3";

  let accumulated = 0;

  const stops = (Object.keys(counts) as AppointmentStatus[])
    .filter((status) => counts[status] > 0)
    .map((status) => {
      const from = (accumulated / total) * 100;
      accumulated += counts[status];
      const to = (accumulated / total) * 100;

      return `${STATUS_COLORS[status]} ${from}% ${to}%`;
    });

  return `conic-gradient(${stops.join(", ")})`;
}