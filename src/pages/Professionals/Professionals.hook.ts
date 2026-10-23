import { useEffect, useMemo, useState } from "react";
import {
  getProfessionals,
  getProfessionalAvailability,
} from "../../services/professionalService";
import { getSpecialties } from "../../services/specialtyService";
import type { Specialty } from "../PatientBooking/PatientBooking.types";
import type { ProfessionalListItem, StatusFilter } from "./Professionals.types";
import { getNextAvailability } from "./Professionals.utils";

export function useProfessionals() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  const [items, setItems] = useState<ProfessionalListItem[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [professionals, specialtiesData] = await Promise.all([
          getProfessionals(signal),
          getSpecialties(signal),
        ]);

        const withAvailability = await Promise.all(
          professionals.map(async (professional) => {
            const availabilities = await getProfessionalAvailability(
              professional.id,
              signal,
            ).catch(() => []);

            return {
              ...professional,
              availabilities,
              nextAvailability: getNextAvailability(availabilities),
              isAvailable: availabilities.length > 0,
            };
          }),
        );

        if (signal.aborted) return;
        setItems(withAvailability);
        setSpecialties(specialtiesData);
      } catch {
        if (signal.aborted) return;
        setError("Não foi possível carregar os profissionais.");
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const professionals = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return items.filter((p) => {
      const matchesSearch =
        !searchValue ||
        p.fullName.toLowerCase().includes(searchValue) ||
        p.registrationNumber.toLowerCase().includes(searchValue) ||
        p.specialtyName.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "" ||
        (statusFilter === "available" ? p.isAvailable : !p.isAvailable);

      const matchesSpecialty =
        specialtyFilter === "" || p.specialtyId === Number(specialtyFilter);

      return matchesSearch && matchesStatus && matchesSpecialty;
    });
  }, [items, search, statusFilter, specialtyFilter]);

  const summary = useMemo(
    () => ({
      total: items.length,
      specialties: new Set(items.map((p) => p.specialtyId)).size,
      available: items.filter((p) => p.isAvailable).length,
      unavailable: items.filter((p) => !p.isAvailable).length,
    }),
    [items],
  );

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    specialtyFilter,
    setSpecialtyFilter,
    professionals,
    specialties,
    summary,
    loading,
    error,
  };
}