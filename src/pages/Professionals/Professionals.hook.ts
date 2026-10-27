import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  deleteProfessional,
  getProfessionalAvailability,
  getProfessionalsOverview,
} from "../../services/professionalService";
import { getSpecialties } from "../../services/specialtyService";
import type { Specialty } from "../PatientBooking/PatientBooking.types";
import type { ProfessionalListItem, StatusFilter } from "./Professionals.types";
import { getNextAvailability } from "./Professionals.utils";

export function useProfessionals() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");

  const [items, setItems] = useState<ProfessionalListItem[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuProfessional, setMenuProfessional] =
    useState<ProfessionalListItem | null>(null);
  const [toDelete, setToDelete] = useState<ProfessionalListItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [professionals, specialtiesData] = await Promise.all([
          getProfessionalsOverview(signal),
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
      } catch (err) {
        if (axios.isCancel(err) || signal.aborted) return;
        setError(
          getApiErrorMessage(err, "Não foi possível carregar os profissionais."),
        );
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [reloadKey]);

  const professionals = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return items.filter((p) => {
      const matchesSearch =
        !searchValue ||
        p.fullName.toLowerCase().includes(searchValue) ||
        p.registrationNumber.toLowerCase().includes(searchValue) ||
        p.specialtyName.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" ? p.isAvailable : !p.isAvailable);

      const matchesSpecialty =
        specialtyFilter === "all" || p.specialtyId === Number(specialtyFilter);

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

  function openMenu(element: HTMLElement, professional: ProfessionalListItem) {
    setMenuAnchor(element);
    setMenuProfessional(professional);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  function askDelete() {
    setToDelete(menuProfessional);
    closeMenu();
  }

  async function confirmDelete() {
    if (!toDelete) return;

    try {
      setIsDeleting(true);
      await deleteProfessional(toDelete.id);
      toast.success("Profissional excluído.");
      setToDelete(null);
      setReloadKey((key) => key + 1);
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível excluir o profissional."),
      );
    } finally {
      setIsDeleting(false);
    }
  }

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
    reload: () => setReloadKey((key) => key + 1),
    menuAnchor,
    menuProfessional,
    openMenu,
    closeMenu,
    askDelete,
    toDelete,
    setToDelete,
    confirmDelete,
    isDeleting,
  };
}