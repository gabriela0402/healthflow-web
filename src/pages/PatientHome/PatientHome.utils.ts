import type { PatientSpecialty } from "./PatientHome.types";

export function getFormattedDate() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());
}


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