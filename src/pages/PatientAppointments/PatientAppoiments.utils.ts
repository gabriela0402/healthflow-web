import type {
  AppointmentStatus,
  PacientAppointment,
} from "./PatientAppointments.types";

export const appointments: PacientAppointment[] = [
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Ter",
  },
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Ter",
  },
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Ter",
  },
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Qua",
  },
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Seg",
  },
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Qui",
  },
  {
    id: 1,
    time: "18:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Seg",
  },
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Souza",
    age: 29,
    code: "#PT-4582",
    specialty: "Cardiologia",
    status: "confirmed",
    day: "Qua",
  },
];

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getStatusLabel(status: AppointmentStatus) {
  const labels = {
    confirmed: "Confirmado",
    scheduled: "Agendado",
    cancelled: "Cancelado",
  };

  return labels[status];
}
