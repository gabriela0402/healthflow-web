export type PatientStatus =
  | "active"
  | "inactive"
  | "pending";

export type Patient = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  nextAppointment: string;
  status: PatientStatus;
};
