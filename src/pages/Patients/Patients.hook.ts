import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../services/apiError";
import type { Patient } from "./Patients.types";
import { mapPatient } from "./Patients.utils";
import { toast } from "react-toastify";
import {
  deletePatient,
  getPatientProfile,
  getPatientsOverview,
} from "../../services/patientService";
import type { PatientProfileResponse } from "../../types/patient";

export function usePatients() {
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [ageRange, setAgeRange] = useState("all");
  const [gender, setGender] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getPatientsOverview(controller.signal);
        setAllPatients(data.map(mapPatient));
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          getApiErrorMessage(err, "Não foi possível carregar os pacientes."),
        );
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

      const matchesAge =
        ageRange === "all" ||
        (patient.age !== null &&
          ((ageRange === "child" && patient.age < 18) ||
            (ageRange === "adult" && patient.age >= 18 && patient.age < 60) ||
            (ageRange === "elderly" && patient.age >= 60)));

      const matchesGender =
        gender === "all" ||
        (gender === "female" && patient.gender === "Feminino") ||
        (gender === "male" && patient.gender === "Masculino") ||
        (gender === "other" &&
          patient.gender !== "Feminino" &&
          patient.gender !== "Masculino");

      return matchesSearch && matchesStatus && matchesAge && matchesGender;
    });
  }, [allPatients, search, status, ageRange, gender]);

  const summary = useMemo(() => {
    const now = new Date();

    return {
      total: allPatients.length,
      newThisMonth: allPatients.filter(
        (patient) =>
          patient.createdAt.getMonth() === now.getMonth() &&
          patient.createdAt.getFullYear() === now.getFullYear(),
      ).length,
      futureVisits: allPatients.reduce(
        (sum, patient) => sum + patient.upcomingCount,
        0,
      ),
    };
  }, [allPatients]);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuPatient, setMenuPatient] = useState<Patient | null>(null);
  const [toDelete, setToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [details, setDetails] = useState<PatientProfileResponse | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  function openMenu(element: HTMLElement, patient: Patient) {
    setMenuAnchor(element);
    setMenuPatient(patient);
  }

  function closeMenu() {
    setMenuAnchor(null);
  }

  function askDelete() {
    setToDelete(menuPatient);
    closeMenu();
  }

  async function confirmDelete() {
    if (!toDelete) return;

    try {
      setIsDeleting(true);
      await deletePatient(toDelete.id);
      toast.success("Paciente excluído.");
      setToDelete(null);
      setReloadKey((key) => key + 1);
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível excluir o paciente."),
      );
    } finally {
      setIsDeleting(false);
    }
  }

  async function openDetails(patient: Patient) {
    setDetailsOpen(true);
    setDetails(null);

    try {
      setDetailsLoading(true);
      setDetails(await getPatientProfile(patient.id));
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível carregar os dados."),
      );
      setDetailsOpen(false);
    } finally {
      setDetailsLoading(false);
    }
  }

  function closeDetails() {
    setDetailsOpen(false);
  }

  return {
    search,
    menuAnchor,
    menuPatient,
    openMenu,
    closeMenu,
    askDelete,
    toDelete,
    setToDelete,
    confirmDelete,
    isDeleting,
    detailsOpen,
    details,
    detailsLoading,
    openDetails,
    closeDetails,
    setSearch,
    status,
    setStatus,
    ageRange,
    setAgeRange,
    gender,
    setGender,
    patients,
    summary,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
  };
}
