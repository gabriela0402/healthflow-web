import type { SvgIconComponent } from "@mui/icons-material";

export type AdminSpecialty = {
  id: number;
  name: string;
  description: string;
  professionals: number;
  monthlyAppointments: number;
  professionalsGrowth: number;
  appointmentsGrowth: number;
  icon: SvgIconComponent;
};