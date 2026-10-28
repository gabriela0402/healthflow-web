import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
  getMySchedule,
} from "../../services/appointmentService";
import type {
  AppointmentView,
  ProfessionalAppointment,
} from "./ProfessionalAppointments.types";
import {
  addDays,
  formatShortDate,
  getWeekStart,
  isSameDay,
  mapAppointment,
} from "./ProfessionalAppointments.utils";

type Action = "confirm" | "complete" | "cancel";

const ACTIONS = {
  confirm: { run: confirmAppointment, success: "Agendamento confirmado." },
  complete: { run: completeAppointment, success: "Agendamento concluído." },
  cancel: { run: cancelAppointment, success: "Agendamento cancelado." },
};

export function useProfessionalAppointments() {
  const [appointments, setAppointments] = useState<ProfessionalAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("all");
  const [view, setView] = useState<AppointmentView>("list");
  const [weekOffset, setWeekOffset] = useState(0);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuAppointment, setMenuAppointment] =
    useState<ProfessionalAppointment | null>(null);
  const [isActing, setIsActing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMySchedule(controller.signal);
        setAppointments(data.map(mapAppointment));
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getApiErrorMessage(err, "Não foi possível carregar os agendamentos."));
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

    return appointments.filter((a) => {
      const matchesSearch = a.patient.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" || a.status === status;

      const matchesDate =
        date === "all" ||
        (date === "today" && isSameDay(a.date, today)) ||
        (date === "week" && a.date >= weekStart && a.date < weekEnd);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, search, status, date]);

  const weekDays = useMemo(() => {
    const start = addDays(getWeekStart(new Date()), weekOffset * 7);
    return Array.from({ length: 5 }, (_, index) => addDays(start, index));
  }, [weekOffset]);

  const weekLabel = `${formatShortDate(weekDays[0])} – ${formatShortDate(weekDays[4])}`;

  function getAppointmentsByDay(day: Date) {
    return filteredAppointments.filter((a) => isSameDay(a.date, day));
  }

  const summary = useMemo(() => {
    const now = new Date();
    const weekStart = getWeekStart(now);
    const weekEnd = addDays(weekStart, 7);
    const active = appointments.filter((a) => a.status !== "cancelled");

    return {
      today: active.filter((a) => isSameDay(a.date, now)).length,
      week: active.filter((a) => a.date >= weekStart && a.date < weekEnd).length,
      pending: appointments.filter(
        (a) => a.status === "scheduled" && a.date >= now,
      ).length,
    };
  }, [appointments]);

  function openMenu(element: HTMLElement, appointment: ProfessionalAppointment) {
    setMenuAnchor(element);
    setMenuAppointment(appointment);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  async function runAction(action: Action) {
    if (!menuAppointment) return;

    const { run, success } = ACTIONS[action];
    const id = menuAppointment.id;

    closeMenu();

    try {
      setIsActing(true);
      await run(id);
      toast.success(success);
      reload();
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Não foi possível atualizar o agendamento."));
    } finally {
      setIsActing(false);
    }
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
    loading,
    error,
    reload,
    filteredAppointments,
    weekDays,
    weekLabel,
    goToPreviousWeek: () => setWeekOffset((o) => o - 1),
    goToNextWeek: () => setWeekOffset((o) => o + 1),
    goToCurrentWeek: () => setWeekOffset(0),
    getAppointmentsByDay,
    summary,
    menuAnchor,
    menuAppointment,
    openMenu,
    closeMenu,
    runAction,
    isActing,
  };
}