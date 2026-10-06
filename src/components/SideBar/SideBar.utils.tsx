import type { SideBarItem } from "./SideBar.types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";

export const itemsAdmin: SideBarItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Pacientes",
    path: "/patients",
    icon: PeopleIcon,
  },
  {
    label: "Profissionais",
    path: "/professionals",
    icon: WorkIcon,
  },
  {
    label: "Especialidades",
    path: "/specialties",
    icon: AssessmentIcon,
  },
  {
    label: "Agendamentos",
    path: "/appointments",
    icon: CalendarTodayIcon,
  },
  {
    label: "Relatórios",
    path: "/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Configurações",
    path: "/settings",
    icon: SettingsIcon,
  },
  {
    label: "Sair",
    path: "/login",
    icon: ExitToAppIcon,
  },
];


export const itemsProfessional: SideBarItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Minha Agenda",
    path: "/my-schedule",
    icon: EventIcon,
  },
  {
    label: "Meus Pacientes",
    path: "/my-patients",
    icon: PeopleIcon,
  },
  {
    label: "Meus Agendamentos",
    path: "/my-appointments",
    icon: CalendarTodayIcon,
  },
  {
    label: "Meu Perfil",
    path: "/profile",
    icon: PersonIcon,
  },
  {
    label: "Sair",
    path: "/login",
    icon: ExitToAppIcon,
  },
];


export const itemsPatient: SideBarItem[] = [
  {
    label: "Início",
    path: "/",
    icon: DashboardIcon,
  },
  {
    label: "Meus Agendamentos",
    path: "/my-appointments",
    icon: CalendarTodayIcon,
  },
  {
    label: "Agendar Consulta",
    path: "/book-appointment",
    icon: AddIcon,
  },
  {
    label: "Meus Dados",
    path: "/my-data",
    icon: PersonIcon,
  },
  {
    label: "Notificações",
    path: "/notifications",
    icon: NotificationsIcon,
  },
  {
    label: "Sair",
    path: "/login",
    icon: ExitToAppIcon,
  },
];
