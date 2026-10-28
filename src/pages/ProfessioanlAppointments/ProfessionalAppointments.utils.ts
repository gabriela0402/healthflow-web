import type { AppointmentProfessionalResponse } from "../../types/appointment";
import { getAge } from "../Patients/Patients.utils";
import type {
  AppointmentStatus,
  ProfessionalAppointment,
} from "./ProfessionalAppointments.types";

export { getInitials, getStatusLabel } from "../Appointments/Appoiments.utils";
export {
  addDays,
  formatShortDate,
  getWeekdayLabel,
  getWeekStart,
  isSameDay,
} from "../PatientAppointments/PatientAppoiments.utils";

const STATUS_FROM_API: Record<
  AppointmentProfessionalResponse["status"],
  AppointmentStatus
> = {
  Scheduled: "scheduled",
  Confirmed: "confirmed",
  Cancelled: "cancelled",
  Completed: "completed",
  NoShow: "noShow",
};

export function mapAppointment(
  item: AppointmentProfessionalResponse,
): ProfessionalAppointment {
  const date = new Date(item.scheduledAt);
  const age = getAge(item.patientDateOfBirth);

  return {
    id: item.id,
    date,
    time: date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    patient: item.patientName,
    patientInfo: `${age !== null ? `${age} anos` : "Idade não informada"} • #AG-${String(item.id).padStart(4, "0")}`,
    status: STATUS_FROM_API[item.status] ?? "scheduled",
  };
}