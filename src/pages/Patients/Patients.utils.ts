import type { Patient } from "./Patients.types";

export const mockPatients: Patient[] = [
  {
    id: 1,
    fullName: "João da Silva",
    email: "joao@email.com",
    phone: "(11) 99999-1111",
    age: 45,
    gender: "Masculino",
    nextAppointment: "12/04/2025 às 10:00",
    status: "active",
  },
  {
    id: 2,
    fullName: "Maria Oliveira",
    email: "maria@email.com",
    phone: "(11) 98888-2222",
    age: 34,
    gender: "Feminino",
    nextAppointment: "14/04/2025 às 14:30",
    status: "active",
  },
  {
    id: 3,
    fullName: "Carlos Santos",
    email: "carlos@email.com",
    phone: "(11) 97777-3333",
    age: 52,
    gender: "Masculino",
    nextAppointment: "Nenhum agendamento",
    status: "inactive",
  },
  {
    id: 4,
    fullName: "Ana Pereira",
    email: "ana@email.com",
    phone: "(11) 96666-4444",
    age: 28,
    gender: "Feminino",
    nextAppointment: "18/04/2025 às 09:00",
    status: "pending",
  },
];

export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
