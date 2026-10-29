export type ClinicSettingsResponse = {
  clinicName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  appointmentReminders: boolean;
  automaticConfirmation: boolean;
};

export type SettingsUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};