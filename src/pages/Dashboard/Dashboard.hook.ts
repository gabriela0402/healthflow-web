import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getSession } from "../../auth/session";
import { getApiErrorMessage } from "../../services/apiError";
import { getAppointmentsOverview } from "../../services/appointmentService";
import { getPatientsOverview } from "../../services/patientService";
import { getProfessionals } from "../../services/professionalService";
import { getSpecialties } from "../../services/specialtyService";
import type { AdminAppointment } from "../Appointments/Appointments.types";
import { mapAppointment } from "../Appointments/Appoiments.utils";
import { getHealthPercentage, getMonthlyFlow } from "./Dashboard.utils";

export function useDashboard() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [professionalsCount, setProfessionalsCount] = useState(0);
  const [specialtiesCount, setSpecialtiesCount] = useState(0);

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

        const [appointmentsData, patients, professionals, specialties] =
          await Promise.all([
            getAppointmentsOverview(controller.signal),
            getPatientsOverview(controller.signal),
            getProfessionals(controller.signal),
            getSpecialties(controller.signal),
          ]);

        setAppointments(appointmentsData.map(mapAppointment));
        setPatientsCount(patients.length);
        setProfessionalsCount(professionals.length);
        setSpecialtiesCount(specialties.length);
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

  const stats = useMemo(() => {
    const now = new Date();

    return {
      appointments: appointments.length,
      pending: appointments.filter(
        (a) => a.status === "scheduled" && a.date >= now,
      ).length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
  }, [appointments]);

  const monthlyFlow = useMemo(() => getMonthlyFlow(appointments), [appointments]);

  const health = useMemo(() => getHealthPercentage(appointments), [appointments]);

  const recent = useMemo(
    () => [...appointments].sort((a, b) => b.id - a.id).slice(0, 3),
    [appointments],
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
      .slice(0, 4);
  }, [appointments]);

  return {
    firstName,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    patientsCount,
    professionalsCount,
    specialtiesCount,
    stats,
    monthlyFlow,
    health,
    recent,
    upcoming,
  };
}