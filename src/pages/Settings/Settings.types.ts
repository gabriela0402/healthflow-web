import type { SvgIconComponent } from "@mui/icons-material";

export type SettingsTab =
  | "clinic"
  | "users"
  | "notifications"
  | "appearance"
  | "security";

export type SettingsTabItem = {
  id: SettingsTab;
  label: string;
  icon: SvgIconComponent;
};

export type ClinicFormData = {
  clinicName: string;
  email: string;
  phone: string;
  address: string;
};
