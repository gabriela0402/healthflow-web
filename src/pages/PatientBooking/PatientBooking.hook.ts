import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { api } from "../../services/api";

import type {
  BookingData,
  BookingStep,
  Specialty,
} from "./PatientBooking.types";

import {
  availableDates,
  availableTimes,
  professionals,
} from "./PatientBooking.utils";

export function usePatientBooking() {
  const [step, setStep] =
    useState<BookingStep>(1);

  const [search, setSearch] =
    useState("");

  const [specialties, setSpecialties] =
    useState<Specialty[]>([]);

  const [
    isLoadingSpecialties,
    setIsLoadingSpecialties,
  ] = useState(true);

  const [
    specialtiesError,
    setSpecialtiesError,
  ] = useState("");

  const [booking, setBooking] =
    useState<BookingData>({
      specialty: null,
      professional: null,
      date: "",
      time: "",
    });

  useEffect(() => {
    async function loadSpecialties() {
      try {
        setIsLoadingSpecialties(true);
        setSpecialtiesError("");

        const response = await api.get<Specialty[]>(
          "/specialties",
        );

        setSpecialties(response.data);
      } catch (error) {
        console.error(
          "Erro ao carregar especialidades:",
          error,
        );

        setSpecialtiesError(
          "Não foi possível carregar as especialidades.",
        );
      } finally {
        setIsLoadingSpecialties(false);
      }
    }

    loadSpecialties();
  }, []);

  const filteredSpecialties = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    if (!searchValue) {
      return specialties;
    }

    return specialties.filter((specialty) =>
      specialty.name
        .toLowerCase()
        .includes(searchValue),
    );
  }, [search, specialties]);

  const filteredProfessionals = useMemo(() => {
    if (!booking.specialty) {
      return [];
    }

    return professionals.filter(
      (professional) =>
        professional.specialty ===
        booking.specialty?.name,
    );
  }, [booking.specialty]);

  function selectSpecialty(
    specialtyId: number,
  ) {
    const selectedSpecialty =
      specialties.find(
        (specialty) =>
          specialty.id === specialtyId,
      );

    if (!selectedSpecialty) {
      return;
    }

    setBooking((previous) => ({
      ...previous,
      specialty: selectedSpecialty,
      professional: null,
      date: "",
      time: "",
    }));
  }

  function selectProfessional(
    professionalId: number,
  ) {
    const selectedProfessional =
      professionals.find(
        (professional) =>
          professional.id === professionalId,
      );

    if (!selectedProfessional) {
      return;
    }

    setBooking((previous) => ({
      ...previous,
      professional: selectedProfessional,
      date: "",
      time: "",
    }));
  }

  function selectDate(date: string) {
    setBooking((previous) => ({
      ...previous,
      date,
      time: "",
    }));
  }

  function selectTime(time: string) {
    setBooking((previous) => ({
      ...previous,
      time,
    }));
  }

  function canContinue() {
    if (step === 1) {
      return Boolean(booking.specialty);
    }

    if (step === 2) {
      return Boolean(booking.professional);
    }

    if (step === 3) {
      return Boolean(
        booking.date && booking.time,
      );
    }

    return true;
  }

  function nextStep() {
    if (!canContinue()) {
      return;
    }

    if (step < 4) {
      setStep(
        (previous) =>
          (previous + 1) as BookingStep,
      );
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep(
        (previous) =>
          (previous - 1) as BookingStep,
      );
    }
  }

  function goToStep(
    targetStep: BookingStep,
  ) {
    if (targetStep < step) {
      setStep(targetStep);
    }
  }

  function confirmAppointment() {
    console.log(
      "Consulta confirmada:",
      booking,
    );
  }

  const selectedDate =
    availableDates.find(
      (date) =>
        date.value === booking.date,
    );

  return {
    step,
    search,
    setSearch,
    booking,
    filteredSpecialties,
    filteredProfessionals,
    availableDates,
    availableTimes,
    selectedDate,
    isLoadingSpecialties,
    specialtiesError,
    selectSpecialty,
    selectProfessional,
    selectDate,
    selectTime,
    canContinue,
    nextStep,
    previousStep,
    goToStep,
    confirmAppointment,
  };
}
