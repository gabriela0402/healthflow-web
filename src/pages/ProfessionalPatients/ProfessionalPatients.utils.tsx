import type { ProfessionalPatientResponse } from "../../types/patient";
import { formatNextAppointment, getAge } from "../Patients/Patients.utils";
import type { ProfessionalPatient } from "./ProfessionalPatients.types";

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

export function mapPatient(item: ProfessionalPatientResponse): ProfessionalPatient {
  return {
    id: item.id,
    fullName: item.fullName,
    email: item.email,
    phone: item.phone || "—",
    age: getAge(item.dateOfBirth),
    gender: item.gender || "Não informado",
    nextAppointment: formatNextAppointment(
      item.nextAppointmentAt ? new Date(item.nextAppointmentAt) : null,
    ),
    upcomingCount: item.upcomingCount,
    firstAppointmentAt: new Date(item.firstAppointmentAt),
    status: item.status,
  };
}