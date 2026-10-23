import Accessibility from "@mui/icons-material/Accessibility";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Healing from "@mui/icons-material/Healing";
import LocalHospital from "@mui/icons-material/LocalHospital";
import MonitorHeart from "@mui/icons-material/MonitorHeart";
import Psychology from "@mui/icons-material/Psychology";
import Restaurant from "@mui/icons-material/Restaurant";
import Spa from "@mui/icons-material/Spa";
import type { SvgIconComponent } from "@mui/icons-material";

import type { Professional, Specialty } from "../PatientBooking/PatientBooking.types";
import type { AdminAppointment } from "../Appointments/Appointments.types";
import type { AdminSpecialty } from "./Specialties.types";

const DEFAULT_DESCRIPTION = "Especialidade disponível para agendamento.";

const DESCRIPTIONS: Record<string, string> = {
  "clínica geral": "Atendimento médico geral e cuidados preventivos.",
  cardiologia: "Diagnóstico e tratamento do coração.",
  dermatologia: "Cuidados com a pele, cabelo e unhas.",
  endocrinologia: "Tratamento hormonal e metabólico.",
  ginecologia: "Cuidados com a saúde da mulher.",
  neurologia: "Cuidados para doenças do sistema nervoso.",
  nutrição: "Orientação alimentar e nutricional.",
  ortopedia: "Tratamento de ossos e articulações.",
  pediatria: "Cuidados médicos para crianças.",
  psicologia: "Acompanhamento da saúde mental.",
};

const ICONS: [string, SvgIconComponent][] = [
  ["cardio", FavoriteBorder],
  ["derma", Spa],
  ["endocrino", MonitorHeart],
  ["gineco", Healing],
  ["neuro", Psychology],
  ["psico", Psychology],
  ["nutri", Restaurant],
  ["ortop", Accessibility],
];

function getIcon(name: string): SvgIconComponent {
  const normalized = name.toLowerCase();
  return ICONS.find(([key]) => normalized.includes(key))?.[1] ?? LocalHospital;
}

function getGrowth(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export function buildSpecialties(
  specialties: Specialty[],
  professionals: Professional[],
  appointments: AdminAppointment[],
): AdminSpecialty[] {
  const now = new Date();
  const previous = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const countInMonth = (name: string, ref: Date) =>
    appointments.filter(
      (a) =>
        a.specialty === name &&
        a.status !== "cancelled" &&
        a.date.getMonth() === ref.getMonth() &&
        a.date.getFullYear() === ref.getFullYear(),
    ).length;

  return specialties.map((specialty) => {
    const current = countInMonth(specialty.name, now);

    return {
      id: specialty.id,
      name: specialty.name,
      description:
        specialty.description ||
        DESCRIPTIONS[specialty.name.toLowerCase()] ||
        DEFAULT_DESCRIPTION,
      professionals: professionals.filter((p) => p.specialtyId === specialty.id)
        .length,
      monthlyAppointments: current,
      professionalsGrowth: 0,
      appointmentsGrowth: getGrowth(current, countInMonth(specialty.name, previous)),
      icon: getIcon(specialty.name),
    };
  });
}