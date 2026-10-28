import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getSession } from "../../auth/session";
import { getApiErrorMessage } from "../../services/apiError";
import { getMySchedule } from "../../services/appointmentService";
import type { ProfessionalAppointment } from "../ProfessioanlAppointments/ProfessionalAppointments.types";
import {
  formatShortDate,
  isSameDay,
  mapAppointment,
} from "../ProfessioanlAppointments/ProfessionalAppointments.utils";
import { getWeekChart } from "./ProfessionalDashboard.utils";

export function useProfessionalDashboard() {
  const [appointments, setAppointments] = useState<ProfessionalAppointment[]>([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const firstName = getSession()?.name.split(" ")[0] ?? "";

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMySchedule(controller.signal);

        setAppointments(data.map(mapAppointment));
        setPatientsCount(new Set(data.map((item) => item.patientId)).size);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getApiErrorMessage(err, "Não foi possível carregar o painel."));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const upcoming = useMemo(() => {
    const now = new Date();

    return appointments
      .filter(
        (a) =>
          a.date >= now &&
          (a.status === "scheduled" || a.status === "confirmed"),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [appointments]);

  const stats = useMemo(() => {
    const now = new Date();
    const next = upcoming[0];

    return {
      today: appointments.filter(
        (a) => a.status !== "cancelled" && isSameDay(a.date, now),
      ).length,
      pending: upcoming.filter((a) => a.status === "scheduled").length,
      next: next
        ? isSameDay(next.date, now)
          ? next.time
          : `${formatShortDate(next.date)}, ${next.time}`
        : "Nenhum",
    };
  }, [appointments, upcoming]);

  const weekChart = useMemo(() => getWeekChart(appointments), [appointments]);

  return {
    firstName,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    patientsCount,
    stats,
    weekChart,
    upcoming: upcoming.slice(0, 4),
  };
}