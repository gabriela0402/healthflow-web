import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  cancelAppointment,
  completeAppointment,
  confirmAppointment,
  getAppointmentsOverview,
} from "../../services/appointmentService";
import type {
  AdminAppointment,
  AppointmentAction,
  AppointmentStatus,
} from "./Appointments.types";
import {
  buildDonutGradient,
  getWeekRange,
  isSameDay,
  mapAppointment,
} from "./Appoiments.utils";

const ACTIONS = {
  confirm: { run: confirmAppointment, success: "Agendamento confirmado." },
  complete: { run: completeAppointment, success: "Agendamento concluído." },
  cancel: { run: cancelAppointment, success: "Agendamento cancelado." },
};

export function useAppointments() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("all");
  const [professional, setProfessional] = useState("all");
  const [status, setStatus] = useState("all");

  const [showAllUpcoming, setShowAllUpcoming] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuAppointment, setMenuAppointment] =
    useState<AdminAppointment | null>(null);
  const [isActing, setIsActing] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAppointmentsOverview(controller.signal);
        setAppointments(data.map(mapAppointment));
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          getApiErrorMessage(err, "Não foi possível carregar os agendamentos."),
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  const professionals = useMemo(() => {
    const map = new Map<number, string>();
    appointments.forEach((a) => map.set(a.professionalId, a.professional));

    return Array.from(map, ([id, name]) => ({ id, name })).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const searchValue = search.toLowerCase().trim();
    const today = new Date();
    const week = getWeekRange(today);

    return appointments.filter((a) => {
      const matchesSearch =
        a.patient.toLowerCase().includes(searchValue) ||
        a.professional.toLowerCase().includes(searchValue) ||
        a.specialty.toLowerCase().includes(searchValue);

      const matchesDate =
        date === "all" ||
        (date === "today" && isSameDay(a.date, today)) ||
        (date === "week" && a.date >= week.start && a.date < week.end);

      const matchesProfessional =
        professional === "all" || String(a.professionalId) === professional;

      const matchesStatus = status === "all" || a.status === status;

      return matchesSearch && matchesDate && matchesProfessional && matchesStatus;
    });
  }, [appointments, search, date, professional, status]);

  const summary = useMemo(() => {
    const today = new Date();
    const todays = appointments.filter((a) => isSameDay(a.date, today));

    return {
      total: todays.length,
      confirmed: todays.filter((a) => a.status === "confirmed").length,
      scheduled: todays.filter((a) => a.status === "scheduled").length,
    };
  }, [appointments]);

  const statusCounts = useMemo(() => {
    const counts: Record<AppointmentStatus, number> = {
      confirmed: 0,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
      noShow: 0,
    };

    appointments.forEach((a) => {
      counts[a.status] += 1;
    });

    return counts;
  }, [appointments]);

  const donutGradient = useMemo(
    () => buildDonutGradient(statusCounts),
    [statusCounts],
  );

  const upcoming = useMemo(() => {
    const now = new Date();

    return appointments
      .filter(
        (a) =>
          a.date >= now &&
          (a.status === "scheduled" || a.status === "confirmed"),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, showAllUpcoming ? 8 : 3);
  }, [appointments, showAllUpcoming]);

  function openMenu(element: HTMLElement, appointment: AdminAppointment) {
    setMenuAnchor(element);
    setMenuAppointment(appointment);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  async function runAction(action: AppointmentAction) {
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
      toast.error(
        getApiErrorMessage(err, "Não foi possível atualizar o agendamento."),
      );
    } finally {
      setIsActing(false);
    }
  }

  return {
    search,
    setSearch,
    date,
    setDate,
    professional,
    setProfessional,
    status,
    setStatus,
    professionals,
    filteredAppointments,
    summary,
    statusCounts,
    totalCount: appointments.length,
    donutGradient,
    upcoming,
    showAllUpcoming,
    toggleShowAllUpcoming: () => setShowAllUpcoming((previous) => !previous),
    loading,
    error,
    reload,
    menuAnchor,
    menuAppointment,
    openMenu,
    closeMenu,
    runAction,
    isActing,
  };
}