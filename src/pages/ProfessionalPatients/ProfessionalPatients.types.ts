export type PatientStatus = "active" | "inactive" | "pending";

export type ProfessionalPatient = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age: number | null;
  gender: string;
  nextAppointment: string;
  upcomingCount: number;
  firstAppointmentAt: Date;
  status: PatientStatus;
};