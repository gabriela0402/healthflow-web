import type { SvgIconComponent } from "@mui/icons-material";

export type SpecialtyCardProps = {
  name: string;
  description: string;
  professionals: number;
  monthlyAppointments: number;
  professionalsGrowth: number;
  appointmentsGrowth: number;
  icon: SvgIconComponent;
  onDetailsClick?: () => void;
};
