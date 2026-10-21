export type PatientProfileResponse = {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  cpf: string | null;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
};

export type UpdatePatientProfilePayload = {
  fullName: string;
  phone: string | null;
  dateOfBirth: string | null; // "1990-04-15"
  gender: string | null;
  cpf: string | null;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
};