import type { PatientListItemResponse } from "../../types/patient";
import type { Patient } from "./Patients.types";

export function getInitials(fullName: string) {
  return (
    fullName
      .split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

function getAge(dateOfBirth: string | null) {
  if (!dateOfBirth) return null;

  const birth = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  if (!hadBirthday) age -= 1;

  return age >= 0 ? age : null;
}

function formatNextAppointment(date: Date | null) {
  if (!date) return "Nenhum agendamento";

  const day = date.toLocaleDateString("pt-BR");
  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} às ${time}`;
}

export function mapPatient(item: PatientListItemResponse): Patient {
  const nextAppointmentAt = item.nextAppointmentAt
    ? new Date(item.nextAppointmentAt)
    : null;

  return {
    id: item.id,
    fullName: item.fullName,
    email: item.email,
    phone: item.phone || "—",
    age: getAge(item.dateOfBirth),
    gender: item.gender || "Não informado",
    nextAppointment: formatNextAppointment(nextAppointmentAt),
    nextAppointmentAt,
    upcomingCount: item.upcomingCount,
    createdAt: new Date(item.createdAt),
    status: item.status,
  };
}
