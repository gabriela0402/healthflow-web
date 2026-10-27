export type ProfessionalAdminResponse = {
  id: number;
  fullName: string;
  registrationNumber: string;
  specialtyId: number;
  specialtyName: string;
  email: string | null;
};

export type CreateProfessionalPayload = {
  fullName: string;
  email: string;
  password: string;
  registrationNumber: string;
  specialtyId: number;
};

export type UpdateProfessionalPayload = {
  fullName: string;
  registrationNumber: string;
  specialtyId: number;
  email: string | null;
  newPassword: string | null;
};