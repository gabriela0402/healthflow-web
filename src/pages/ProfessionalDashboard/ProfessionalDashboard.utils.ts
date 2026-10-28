import type { ProfessionalAppointment } from "../ProfessioanlAppointments/ProfessionalAppointments.types";
import {
  addDays,
  getWeekStart,
  isSameDay,
} from "../ProfessioanlAppointments/ProfessionalAppointments.utils";

export const getFormattedDate = (): string => {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function getWeekChart(appointments: ProfessionalAppointment[]) {
  const sunday = addDays(getWeekStart(new Date()), -1);

  return WEEKDAYS.map((label, index) => {
    const day = addDays(sunday, index);

    return {
      day: label,
      appointments: appointments.filter(
        (a) => a.status !== "cancelled" && isSameDay(a.date, day),
      ).length,
    };
  });
}