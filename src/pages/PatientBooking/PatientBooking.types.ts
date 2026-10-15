export type BookingStep = 1 | 2 | 3 | 4;

export type Specialty = {
  id: number;
  name: string;
  description?: string;
};

export type Professional = {
  id: number;
  name: string;
  specialty: string;
  registration: string;
};

export type BookingData = {
  specialty: Specialty | null;
  professional: Professional | null;
  date: string;
  time: string;
};
