import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getMyAppointments } from "../../services/appointmentService";
import type {
  AppointmentView,
  PatientAppointment,
} from "./PatientAppointments.types";
import {
  addDays,
  formatShortDate,
  getWeekStart,
  isSameDay,
  mapAppointment,
} from "./PatientAppoiments.utils";

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Não foi possível conectar ao servidor.";
    }

    if (error.response.status === 401) {
      return "Sua sessão expirou. Faça login novamente.";
    }

    const data = error.response.data;

    if (typeof data === "string" && data) return data;
    if (data?.message) return data.message;
  }

  return "Não foi possível carregar os agendamentos.";
}

export function usePatientAppointments() {
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("status");
  const [date, setDate] = useState("date");
  const [view, setView] = useState<AppointmentView>("list");
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyAppointments(controller.signal);
        setAppointments(data.map(mapAppointment));
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getErrorMessage(err));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  const filteredAppointments = useMemo(() => {
    const searchValue = search.toLowerCase().trim();
    const today = new Date();
    const weekStart = getWeekStart(today);
    const weekEnd = addDays(weekStart, 7);

    return appointments.filter((appointment) => {
      const matchesSearch =
        appointment.professional.toLowerCase().includes(searchValue) ||
        appointment.specialty.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "status" || appointment.status === status;

      const matchesDate =
        date === "date" ||
        (date === "today" && isSameDay(appointment.date, today)) ||
        (date === "week" &&
          appointment.date >= weekStart &&
          appointment.date < weekEnd);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, search, status, date]);

  const weekDays = useMemo(() => {
    const start = addDays(getWeekStart(new Date()), weekOffset * 7);
    return Array.from({ length: 5 }, (_, index) => addDays(start, index));
  }, [weekOffset]);

  const weekLabel = `${formatShortDate(weekDays[0])} – ${formatShortDate(
    weekDays[4],
  )}`;

  function getAppointmentsByDay(day: Date) {
    return filteredAppointments.filter((appointment) =>
      isSameDay(appointment.date, day),
    );
  }

  const summary = useMemo(() => {
    const now = new Date();

    return {
      total: appointments.length,
      upcoming: appointments.filter(
        (a) =>
          a.date >= now &&
          (a.status === "scheduled" || a.status === "confirmed"),
      ).length,
      confirmed: appointments.filter((a) => a.status === "confirmed").length,
      pending: appointments.filter((a) => a.status === "scheduled").length,
    };
  }, [appointments]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    date,
    setDate,
    view,
    setView,
    loading,
    error,
    reload,
    filteredAppointments,
    weekDays,
    weekLabel,
    goToPreviousWeek: () => setWeekOffset((offset) => offset - 1),
    goToNextWeek: () => setWeekOffset((offset) => offset + 1),
    goToCurrentWeek: () => setWeekOffset(0),
    getAppointmentsByDay,
    summary,
  };
}
