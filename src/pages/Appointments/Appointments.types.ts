export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "noShow";

export type AppointmentAction = "confirm" | "complete" | "cancel";

export type AdminAppointment = {
  id: number;
  date: Date;
  time: string;
  patient: string;
  patientInfo: string;
  professionalId: number;
  professional: string;
  specialty: string;
  status: AppointmentStatus;
};