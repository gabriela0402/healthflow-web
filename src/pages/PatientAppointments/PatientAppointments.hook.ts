import { useMemo, useState } from "react";
import type { AppointmentView } from "./PatientAppointments.types";
import { appointments } from "./PatientAppoiments.utils";

export function usePatientAppointments() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("status");
  const [date, setDate] = useState("date");

  const [view, setView] =
    useState<AppointmentView>("list");

  const filteredAppointments = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.patient
          .toLowerCase()
          .includes(searchValue) ||
        appointment.specialty
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "status" ||
        appointment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const days = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  function getAppointmentsByDay(day: string) {
    return filteredAppointments.filter(
      (appointment) => appointment.day === day,
    );
  }

  return {
    search,
    setSearch,
    status,
    setStatus,
    date,
    setDate,
    view,
    setView,
    days,
    filteredAppointments,
    getAppointmentsByDay,
  };
}
