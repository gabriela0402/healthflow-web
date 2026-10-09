export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "pending"
  | "cancelled"
  | "completed";

export const appointments = [
  {
    id: 1,
    time: "08:00",
    patient: "Olivia Brown",
    patientInfo: "29 anos • #PT-4582",
    professional: "Dra. Sarah Miller",
    specialty: "Cardiologia",
    status: "scheduled" as AppointmentStatus,
  },
  {
    id: 2,
    time: "08:30",
    patient: "Liam Wilson",
    patientInfo: "42 anos • #PT-7710",
    professional: "Dr. Michael Chen",
    specialty: "Neurologia",
    status: "confirmed" as AppointmentStatus,
  },
  {
    id: 3,
    time: "09:00",
    patient: "Emma Davis",
    patientInfo: "36 anos • #PT-6931",
    professional: "Dra. Emily Watson",
    specialty: "Dermatologia",
    status: "confirmed" as AppointmentStatus,
  },
  {
    id: 4,
    time: "09:30",
    patient: "Noah Martinez",
    patientInfo: "50 anos • #PT-8820",
    professional: "Dr. Robert Khan",
    specialty: "Ortopedia",
    status: "scheduled" as AppointmentStatus,
  },
  {
    id: 5,
    time: "10:00",
    patient: "Ava Taylor",
    patientInfo: "27 anos • #PT-3190",
    professional: "Dra. Lisa Thompson",
    specialty: "Pediatria",
    status: "confirmed" as AppointmentStatus,
  },
  {
    id: 6,
    time: "10:30",
    patient: "William Anderson",
    patientInfo: "61 anos • #PT-6045",
    professional: "Dra. Sarah Miller",
    specialty: "Cardiologia",
    status: "cancelled" as AppointmentStatus,
  },
  {
    id: 7,
    time: "11:00",
    patient: "Sophia Thomas",
    patientInfo: "45 anos • #PT-7756",
    professional: "Dr. Michael Chen",
    specialty: "Neurologia",
    status: "scheduled" as AppointmentStatus,
  },
  {
    id: 8,
    time: "11:30",
    patient: "James White",
    patientInfo: "38 anos • #PT-4421",
    professional: "Dra. Emily Watson",
    specialty: "Dermatologia",
    status: "completed" as AppointmentStatus,
  },
  {
    id: 9,
    time: "13:00",
    patient: "Isabella Harris",
    patientInfo: "8 anos • #PT-9910",
    professional: "Dra. Lisa Thompson",
    specialty: "Pediatria",
    status: "confirmed" as AppointmentStatus,
  },
  {
    id: 10,
    time: "13:30",
    patient: "Benjamin Clark",
    patientInfo: "67 anos • #PT-2867",
    professional: "Dr. Robert Khan",
    specialty: "Ortopedia",
    status: "scheduled" as AppointmentStatus,
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
    scheduled: "Agendado",
    confirmed: "Confirmado",
    pending: "Pendente",
    cancelled: "Cancelado",
    completed: "Concluído",
  };

  return labels[status];
}
