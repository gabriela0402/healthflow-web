export type ProfessionalStatus =
  | "active"
  | "inactive"
  | "pending";

export type Professional = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  nextAppointment: string;
  status: ProfessionalStatus;
};
