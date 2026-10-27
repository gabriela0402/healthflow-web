import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getApiErrorMessage } from "../../services/apiError";
import { getMyPatients } from "../../services/appointmentService";
import type { ProfessionalPatient } from "./ProfessionalPatients.types";
import { mapPatient } from "./ProfessionalPatients.utils";

export function usePatients() {
  const [allPatients, setAllPatients] = useState<ProfessionalPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [gender, setGender] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyPatients(controller.signal);
        setAllPatients(data.map(mapPatient));
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(getApiErrorMessage(err, "Não foi possível carregar os pacientes."));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const patients = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return allPatients.filter((patient) => {
      const matchesSearch =
        patient.fullName.toLowerCase().includes(searchValue) ||
        patient.email.toLowerCase().includes(searchValue);

      const matchesStatus = status === "all" || patient.status === status;

      const matchesGender =
        gender === "all" ||
        (gender === "female" && patient.gender === "Feminino") ||
        (gender === "male" && patient.gender === "Masculino") ||
        (gender === "other" &&
          patient.gender !== "Feminino" &&
          patient.gender !== "Masculino");

      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [allPatients, search, status, gender]);

  const summary = useMemo(() => {
    const now = new Date();

    return {
      total: allPatients.length,
      newThisMonth: allPatients.filter(
        (p) =>
          p.firstAppointmentAt.getMonth() === now.getMonth() &&
          p.firstAppointmentAt.getFullYear() === now.getFullYear(),
      ).length,
      scheduled: allPatients.reduce((sum, p) => sum + p.upcomingCount, 0),
    };
  }, [allPatients]);

  return {
    search,
    setSearch,
    status,
    setStatus,
    gender,
    setGender,
    patients,
    summary,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
  };
}