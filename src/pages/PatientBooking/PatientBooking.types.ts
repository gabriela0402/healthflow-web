export type BookingStep = 1 | 2 | 3 | 4;

export type Specialty = {
  id: number;
  name: string;
  description?: string;
};

export type Professional = {
  id: number;
  fullName: string;
  registrationNumber: string;
  specialtyId: number;
  specialtyName: string;
};

export type ProfessionalAvailability = {
  id: number;
  professionalId: number;
  dayOfWeek: number | string;
  startTime: string;
  endTime: string;
  slotDurationInMinutes: number;
};

export type AvailableDate = {
  value: string;
  label: string;
  weekday: string;
};

export type BookingData = {
  specialty: Specialty | null;
  professional: Professional | null;
  date: string;
  time: string;
};
