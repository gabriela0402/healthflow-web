export type AppointmentView = "list" | "calendar";

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "noShow";

export type PatientAppointment = {
  id: number;
  date: Date;
  time: string;
  professional: string;
  specialty: string;
  status: AppointmentStatus;
  notes: string | null;
};