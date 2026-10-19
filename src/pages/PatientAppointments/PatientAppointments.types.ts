export type AppointmentView = "list" | "calendar";

export type AppointmentStatus =
  | "confirmed"
  | "scheduled"
  | "cancelled";

export type PacientAppointment = {
  id: number;
  time: string;
  patient: string;
  age: number;
  code: string;
  specialty: string;
  status: AppointmentStatus;
  day: string;
};
