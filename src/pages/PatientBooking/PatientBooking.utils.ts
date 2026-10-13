import type {
  Professional,
  Specialty,
} from "./PatientBooking.types";

export const specialties: Specialty[] = [
  {
    id: 1,
    name: "Cardiologia",
    description:
      "Diagnóstico e tratamento de doenças do coração e vasos sanguíneos.",
  },
  {
    id: 2,
    name: "Dermatologia",
    description:
      "Cuidados médicos e estéticos da pele, cabelos e unhas.",
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
      "Atenção integral à saúde de crianças e adolescentes.",
  },
  {
    id: 5,
    name: "Ortopedia",
    description:
      "Cuidados com ossos, articulações e lesões esportivas.",
  },
];

export const professionals: Professional[] = [
  {
    id: 1,
    name: "Dra. Sarah Miller",
    specialty: "Cardiologia",
    registration: "CRM-SP 123.456",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiologia",
    registration: "CRM-SP 234.567",
  },
  {
    id: 3,
    name: "Dra. Emily Watson",
    specialty: "Dermatologia",
    registration: "CRM-SP 345.678",
  },
  {
    id: 4,
    name: "Dr. Robert Khan",
    specialty: "Neurologia",
    registration: "CRM-SP 456.789",
  },
];

export const availableDates = [
  {
    value: "2024-04-23",
    label: "23 de abril",
    weekday: "Terça-feira",
  },
  {
    value: "2024-04-24",
    label: "24 de abril",
    weekday: "Quarta-feira",
  },
  {
    value: "2024-04-25",
    label: "25 de abril",
    weekday: "Quinta-feira",
  },
  {
    value: "2024-04-26",
    label: "26 de abril",
    weekday: "Sexta-feira",
  },
];

export const availableTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:30",
  "14:30",
  "15:30",
  "16:30",
];
