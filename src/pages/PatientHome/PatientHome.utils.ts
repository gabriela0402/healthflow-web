import type { PatientSpecialty } from "./PatientHome.types";

export function getFormattedDate() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export const patientSpecialties: PatientSpecialty[] = [
  {
    id: 1,
    name: "Cardiologia",
    description:
      "Diagnóstico e tratamento de doenças do coração.",
  },
  {
    id: 2,
    name: "Dermatologia",
    description:
      "Cuidados com a pele, cabelos e unhas.",
  },
  {
    id: 3,
    name: "Neurologia",
    description:
      "Tratamento de doenças do sistema nervoso.",
  },
  {
    id: 4,
    name: "Pediatria",
    description:
      "Cuidados médicos para crianças e adolescentes.",
  },
  {
    id: 5,
    name: "Ortopedia",
    description:
      "Cuidados com ossos e articulações.",
  },
  {
    id: 6,
    name: "Psicologia",
    description:
      "Acompanhamento da saúde mental.",
  },
];

export function getDayLabel(date: Date) {
  return String(date.getDate()).padStart(2, "0");
}

export function getMonthLabel(date: Date) {
  return date
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
    .toUpperCase();
}

export function formatNextAppointment(date: Date) {
  const day = date.getDate();
  const month = date
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "");
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} de ${month}, ${time}`;
}