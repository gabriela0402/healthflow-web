export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed";

export type ScheduleAppointment = {
  id: number;
  day: string;
  date: string;
  time: string;
  patient: string;
  specialty: string;
  status: AppointmentStatus;
};

export type ScheduleDay = {
  shortName: string;
  date: string;
  fullDate: string;
};
