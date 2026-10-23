import type { AdminAppointment } from "../Appointments/Appointments.types";

export const getFormattedDate = (): string => {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function getMonthlyFlow(appointments: AdminAppointment[], months = 7) {
  const now = new Date();

  return Array.from({ length: months }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - index), 1);

    const label = date
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "");

    return {
      month: label.charAt(0).toUpperCase() + label.slice(1),
      appointments: appointments.filter(
        (a) =>
          a.status !== "cancelled" &&
          a.date.getMonth() === date.getMonth() &&
          a.date.getFullYear() === date.getFullYear(),
      ).length,
    };
  });
}

export function getHealthPercentage(appointments: AdminAppointment[]) {
  if (appointments.length === 0) return null;

  const lost = appointments.filter(
    (a) => a.status === "cancelled" || a.status === "noShow",
  ).length;

  return Math.round(((appointments.length - lost) / appointments.length) * 100);
}