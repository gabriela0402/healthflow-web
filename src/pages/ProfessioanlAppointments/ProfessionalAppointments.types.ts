import type { AppointmentStatus } from "../Appointments/Appointments.types";

export type { AppointmentStatus };

export type AppointmentView = "list" | "calendar";

export type ProfessionalAppointment = {
  id: number;
  date: Date;
  time: string;
  patient: string;
  patientInfo: string;
  status: AppointmentStatus;
};