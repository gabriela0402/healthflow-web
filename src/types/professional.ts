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

export type CreateAvailabilityPayload = {
  dayOfWeek: number;
  startTime: string; // "08:00:00"
  endTime: string;
  slotDurationInMinutes: number;
};