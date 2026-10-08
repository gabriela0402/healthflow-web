import type { SvgIconComponent } from "@mui/icons-material";

export interface ActivityProps {
    icon: SvgIconComponent;
    title: string;
    description: string;
    time: string;
}