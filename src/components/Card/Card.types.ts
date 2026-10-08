import type { SvgIconComponent } from "@mui/icons-material";

export interface CardProps {
    icon: SvgIconComponent;
    title: string;
    num: string;
    type: string
}

export type ContainerProps = {
  cardType?: "dashboard" | "patient";
};