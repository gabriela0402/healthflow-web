import { useState } from "react";
import type {
  AppointmentStatus,
  ScheduleAppointment,
  ScheduleDay,
} from "./ProfessionalSchedule.types";

const weekDays: ScheduleDay[] = [
  {
    shortName: "Seg",
    date: "18 de mar",
    fullDate: "2024-03-18",
  },
  {
    shortName: "Ter",
    date: "19 de mar",
    fullDate: "2024-03-19",
  },
  {
    shortName: "Qua",
    date: "20 de mar",
    fullDate: "2024-03-20",
  },
  {
    shortName: "Qui",
    date: "21 de mar",
    fullDate: "2024-03-21",
  },
  {
    shortName: "Sex",
    date: "22 de mar",
    fullDate: "2024-03-22",
  },
];

const initialAppointments: ScheduleAppointment[] = [
  {
    id: 1,
    day: "Seg",
    date: "2024-03-18",
    time: "08:00",
    patient: "Mariana Silva",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 2,
    day: "Seg",
    date: "2024-03-18",
    time: "10:00",
    patient: "Carlos Mendes",
    specialty: "Cardiologia",
    status: "completed",
  },
  {
    id: 3,
    day: "Seg",
    date: "2024-03-18",
    time: "14:00",
    patient: "Larissa Rocha",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 4,
    day: "Ter",
    date: "2024-03-19",
    time: "08:00",
    patient: "Lucas Almeida",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 5,
    day: "Ter",
    date: "2024-03-19",
    time: "09:30",
    patient: "Fernanda Costa",
    specialty: "Cardiologia",
    status: "pending",
  },
  {
    id: 6,
    day: "Ter",
    date: "2024-03-19",
    time: "11:00",
    patient: "Ricardo Santos",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 7,
    day: "Ter",
    date: "2024-03-19",
    time: "14:00",
    patient: "Patrícia Lima",
    specialty: "Cardiologia",
    status: "pending",
  },
  {
    id: 8,
    day: "Ter",
    date: "2024-03-19",
    time: "16:00",
    patient: "Bruno Oliveira",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 9,
    day: "Qua",
    date: "2024-03-20",
    time: "08:30",
    patient: "Juliana Martins",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 10,
    day: "Qua",
    date: "2024-03-20",
    time: "10:30",
    patient: "Felipe Nascimento",
    specialty: "Cardiologia",
    status: "pending",
  },
  {
    id: 11,
    day: "Qua",
    date: "2024-03-20",
    time: "15:00",
    patient: "Camila Ferreira",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 12,
    day: "Qui",
    date: "2024-03-21",
    time: "09:00",
    patient: "Eduardo Pinto",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 13,
    day: "Qui",
    date: "2024-03-21",
    time: "11:30",
    patient: "Renata Alves",
    specialty: "Cardiologia",
    status: "completed",
  },
  {
    id: 14,
    day: "Qui",
    date: "2024-03-21",
    time: "15:30",
    patient: "Gabriel Souza",
    specialty: "Cardiologia",
    status: "pending",
  },
  {
    id: 15,
    day: "Sex",
    date: "2024-03-22",
    time: "08:00",
    patient: "Aline Barbosa",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 16,
    day: "Sex",
    date: "2024-03-22",
    time: "10:00",
    patient: "Diego Carvalho",
    specialty: "Cardiologia",
    status: "confirmed",
  },
  {
    id: 17,
    day: "Sex",
    date: "2024-03-22",
    time: "13:30",
    patient: "Beatriz Lima",
    specialty: "Cardiologia",
    status: "completed",
  },
];

export function useProfessionalSchedule() {
  const [selectedDate, setSelectedDate] = useState("2024-03-19");

  const [appointments] = useState<ScheduleAppointment[]>(initialAppointments);

  const selectedDay = weekDays.find((day) => day.fullDate === selectedDate);

  function getAppointmentsByDay(day: string) {
    return appointments.filter((appointment) => appointment.day === day);
  }

  function getStatusLabel(status: AppointmentStatus) {
    const labels = {
      confirmed: "Confirmado",
      pending: "Pendente",
      completed: "Concluído",
    };

    return labels[status];
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function handlePreviousWeek() {
    console.log("Semana anterior");
  }

  function handleNextWeek() {
    console.log("Próxima semana");
  }

  function handleToday() {
    setSelectedDate("2024-03-19");
  }

  function getAppointmentTop(time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    const startHour = 8;
    const slotHeight = 92;

    const minutesFromStart = (hours - startHour) * 60 + minutes;

    return (minutesFromStart / 60) * slotHeight + 8;
  }

  return {
    weekDays,
    selectedDate,
    selectedDay,
    setSelectedDate,
    getAppointmentsByDay,
    getStatusLabel,
    getInitials,
    getAppointmentTop,
    handlePreviousWeek,
    handleNextWeek,
    handleToday,
  };
}
