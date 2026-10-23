import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { getApiErrorMessage } from "../../services/apiError";
import { getAppointmentsOverview } from "../../services/appointmentService";
import { getProfessionals } from "../../services/professionalService";
import {
  deleteSpecialty,
  getSpecialties,
} from "../../services/specialtyService";
import type { AdminAppointment } from "../Appointments/Appointments.types";
import { mapAppointment } from "../Appointments/Appoiments.utils";
import { getMonthlyFlow } from "../Dashboard/Dashboard.utils";
import type { AdminSpecialty } from "./Specialties.types";
import { buildSpecialties } from "./Specialties.utils";
import { toast } from "react-toastify";

export function useSpecialties() {
  const [all, setAll] = useState<AdminSpecialty[]>([]);
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [professionalsCount, setProfessionalsCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [coverage, setCoverage] = useState("all");
  const [sort, setSort] = useState("default");

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuSpecialty, setMenuSpecialty] = useState<AdminSpecialty | null>(
    null,
  );
  const [toDelete, setToDelete] = useState<AdminSpecialty | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function openMenu(element: HTMLElement, specialty: AdminSpecialty) {
    setMenuAnchor(element);
    setMenuSpecialty(specialty);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  function askDelete() {
    setToDelete(menuSpecialty);
    closeMenu();
  }

  async function confirmDelete() {
    if (!toDelete) return;

    try {
      setIsDeleting(true);
      await deleteSpecialty(toDelete.id);
      toast.success("Especialidade excluída.");
      setToDelete(null);
      setReloadKey((key) => key + 1);
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível excluir a especialidade."),
      );
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [specialties, professionals, appointmentsData] =
          await Promise.all([
            getSpecialties(controller.signal),
            getProfessionals(controller.signal),
            getAppointmentsOverview(controller.signal),
          ]);

        const mapped = appointmentsData.map(mapAppointment);

        setAppointments(mapped);
        setProfessionalsCount(professionals.length);
        setAll(buildSpecialties(specialties, professionals, mapped));
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          getApiErrorMessage(
            err,
            "Não foi possível carregar as especialidades.",
          ),
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const specialties = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    const result = all.filter((specialty) => {
      const matchesSearch = specialty.name.toLowerCase().includes(searchValue);

      const matchesCoverage =
        coverage === "all" ||
        (coverage === "with" && specialty.professionals > 0) ||
        (coverage === "without" && specialty.professionals === 0);

      return matchesSearch && matchesCoverage;
    });

    const sorted = [...result];

    if (sort === "name-asc")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc")
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "most-used") {
      sorted.sort((a, b) => b.monthlyAppointments - a.monthlyAppointments);
    }
    if (sort === "least-used") {
      sorted.sort((a, b) => a.monthlyAppointments - b.monthlyAppointments);
    }

    return sorted;
  }, [all, search, coverage, sort]);

  const monthlyFlow = useMemo(
    () => getMonthlyFlow(appointments),
    [appointments],
  );

  const stats = useMemo(() => {
    const withProfessionals = all.filter((s) => s.professionals > 0).length;

    return {
      total: all.length,
      withoutProfessionals: all.length - withProfessionals,
      coverage:
        all.length === 0
          ? null
          : Math.round((withProfessionals / all.length) * 100),
    };
  }, [all]);

  return {
    search,
    setSearch,
    coverage,
    setCoverage,
    sort,
    setSort,
    specialties,
    monthlyFlow,
    stats,
    professionalsCount,
    loading,
    error,
    menuAnchor,
    menuSpecialty,
    openMenu,
    closeMenu,
    askDelete,
    toDelete,
    setToDelete,
    confirmDelete,
    isDeleting,
    reload: () => setReloadKey((key) => key + 1),
  };
}
