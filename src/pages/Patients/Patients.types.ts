export type PatientStatus = "active" | "inactive" | "pending";

export type Patient = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age: number | null;
  gender: string;
  nextAppointment: string;
  nextAppointmentAt: Date | null;
  upcomingCount: number;
  createdAt: Date;
  status: PatientStatus;
};