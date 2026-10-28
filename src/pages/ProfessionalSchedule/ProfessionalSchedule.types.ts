import type { AppointmentStatus } from "../Appointments/Appointments.types";

export type { AppointmentStatus };

export type ScheduleAppointment = {
  id: number;
  date: Date;
  dateKey: string;
  time: string;
  patient: string;
  code: string;
  status: AppointmentStatus;
};

export type ScheduleDay = {
  shortName: string;
  date: string;
  fullDate: string;
};