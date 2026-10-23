export type AppointmentApiStatus =
  | "Scheduled"
  | "Confirmed"
  | "Cancelled"
  | "Completed"
  | "NoShow";

export type AppointmentResponse = {
  id: number;
  scheduledAt: string;
  status: AppointmentApiStatus;
  notes: string | null;
  professionalId: number;
  professionalName: string;
  specialty: string;
};

export type AppointmentAdminResponse = {
  id: number;
  scheduledAt: string;
  status: AppointmentApiStatus;
  notes: string | null;
  patientId: number;
  patientName: string;
  patientDateOfBirth: string | null;
  professionalId: number;
  professionalName: string;
  specialty: string;
};