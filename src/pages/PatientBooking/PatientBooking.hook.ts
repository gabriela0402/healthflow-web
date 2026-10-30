import type {
  AvailableDate,
  BookingData,
  BookingStep,
  Professional,
  ProfessionalAvailability,
  Specialty,
} from "./PatientBooking.types";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getSession } from "../../auth/session";
import { getApiErrorMessage } from "../../services/apiError";
import { createAppointment } from "../../services/appointmentService";
import {
  getProfessionalAvailability,
  getProfessionals,
} from "../../services/professionalService";
import { getSpecialties } from "../../services/specialtyService";

export function usePatientBooking() {
  const navigate = useNavigate();

  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);

  const [step, setStep] = useState<BookingStep>(1);

  const [search, setSearch] = useState("");

  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  const [professionals, setProfessionals] = useState<Professional[]>([]);

  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true);

  const [isLoadingProfessionals, setIsLoadingProfessionals] = useState(false);

  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  const [specialtiesError, setSpecialtiesError] = useState("");

  const [professionalsError, setProfessionalsError] = useState("");

  const [availabilityError, setAvailabilityError] = useState("");

  const [searchParams] = useSearchParams();

  const [professionalAvailabilities, setProfessionalAvailabilities] = useState<
    ProfessionalAvailability[]
  >([]);

  const [booking, setBooking] = useState<BookingData>({
    specialty: null,
    professional: null,
    date: "",
    time: "",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoadingSpecialties(true);
        setSpecialtiesError("");
        setSpecialties(await getSpecialties(controller.signal));
      } catch (error) {
        if (axios.isCancel(error)) return;
        setSpecialtiesError("Não foi possível carregar as especialidades.");
      } finally {
        if (!controller.signal.aborted) setIsLoadingSpecialties(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoadingProfessionals(true);
        setProfessionalsError("");
        setProfessionals(await getProfessionals(controller.signal));
      } catch (error) {
        if (axios.isCancel(error)) return;
        setProfessionalsError("Não foi possível carregar os profissionais.");
      } finally {
        if (!controller.signal.aborted) setIsLoadingProfessionals(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!booking.professional) {
      setProfessionalAvailabilities([]);
      return;
    }

    const controller = new AbortController();
    const professionalId = booking.professional.id;

    async function load() {
      try {
        setIsLoadingAvailability(true);
        setAvailabilityError("");
        setProfessionalAvailabilities(
          await getProfessionalAvailability(professionalId, controller.signal),
        );
      } catch (error) {
        if (axios.isCancel(error)) return;
        setProfessionalAvailabilities([]);
        setAvailabilityError(
          "Não foi possível carregar a disponibilidade deste profissional.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoadingAvailability(false);
      }
    }

    load();
    return () => controller.abort();
  }, [booking.professional]);

  useEffect(() => {
    const specialtyId = Number(searchParams.get("specialtyId"));

    if (!specialtyId || specialties.length === 0) return;

    const preselected = specialties.find((item) => item.id === specialtyId);

    if (!preselected) return;

    setBooking((previous) =>
      previous.specialty ? previous : { ...previous, specialty: preselected },
    );
    setStep((previous) => (previous === 1 ? 2 : previous));
  }, [specialties, searchParams]);

  const filteredSpecialties = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return specialties;
    }

    return specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(searchValue),
    );
  }, [search, specialties]);

  const filteredProfessionals = useMemo(() => {
    if (!booking.specialty) {
      return [];
    }

    return professionals.filter(
      (professional) => professional.specialtyId === booking.specialty?.id,
    );
  }, [booking.specialty, professionals]);

  function getDayOfWeekNumber(dayOfWeek: number | string) {
    if (typeof dayOfWeek === "number") {
      return dayOfWeek;
    }

    const normalizedDay = dayOfWeek.toLowerCase();

    const days: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,

      domingo: 0,
      segunda: 1,
      "segunda-feira": 1,
      terca: 2,
      terça: 2,
      "terça-feira": 2,
      quarta: 3,
      "quarta-feira": 3,
      quinta: 4,
      "quinta-feira": 4,
      sexta: 5,
      "sexta-feira": 5,
      sabado: 6,
      sábado: 6,
      "sábado-feira": 6,
    };

    return days[normalizedDay];
  }

  function formatDateValue(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function parseDateValue(value: string) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  }

  function getMinutesFromTime(time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  }

  function formatMinutesAsTime(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);

    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}`;
  }

  const availableDates = useMemo<AvailableDate[]>(() => {
    if (!booking.professional || professionalAvailabilities.length === 0) {
      return [];
    }

    const dates: AvailableDate[] = [];
    const today = new Date();

    for (let index = 1; index <= 60; index++) {
      const date = new Date(today);

      date.setDate(today.getDate() + index);

      const dateDayOfWeek = date.getDay();

      const hasAvailability = professionalAvailabilities.some(
        (availability) =>
          getDayOfWeekNumber(availability.dayOfWeek) === dateDayOfWeek,
      );

      if (!hasAvailability) {
        continue;
      }

      const weekday = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
      }).format(date);

      const label = new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "short",
      }).format(date);

      dates.push({
        value: formatDateValue(date),
        label,
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      });
    }

    return dates;
  }, [booking.professional, professionalAvailabilities]);

  const availableTimes = useMemo(() => {
    if (!booking.date) {
      return [];
    }

    const selectedDate = parseDateValue(booking.date);

    const selectedDayOfWeek = selectedDate.getDay();

    const availability = professionalAvailabilities.find(
      (item) => getDayOfWeekNumber(item.dayOfWeek) === selectedDayOfWeek,
    );

    if (!availability) {
      return [];
    }

    const startMinutes = getMinutesFromTime(availability.startTime);

    const endMinutes = getMinutesFromTime(availability.endTime);

    const times: string[] = [];

    for (
      let current = startMinutes;
      current < endMinutes;
      current += availability.slotDurationInMinutes
    ) {
      times.push(formatMinutesAsTime(current));
    }

    return times;
  }, [booking.date, professionalAvailabilities]);

  const filteredTimes = availableTimes;

  function selectSpecialty(specialtyId: number) {
    const selectedSpecialty = specialties.find(
      (specialty) => specialty.id === specialtyId,
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

    setProfessionalAvailabilities([]);
    setAvailabilityError("");
  }

  function selectProfessional(professionalId: number) {
    const selectedProfessional = professionals.find(
      (professional) => professional.id === professionalId,
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

    setProfessionalAvailabilities([]);
    setAvailabilityError("");
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
      return Boolean(booking.date && booking.time);
    }

    return true;
  }

  function nextStep() {
    if (!canContinue()) {
      return;
    }

    if (step < 4) {
      setStep((previous) => (previous + 1) as BookingStep);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep((previous) => (previous - 1) as BookingStep);
    }
  }

  function goToStep(targetStep: BookingStep) {
    if (targetStep < step) {
      setStep(targetStep);
    }
  }

  async function confirmAppointment() {
    const patientId = Number(localStorage.getItem("patientId"));

    if (!patientId) {
      toast.error("Não foi possível identificar o paciente.");
      return;
    }

    if (!booking.professional) {
      toast.error("Selecione um profissional.");
      return;
    }

    if (!booking.date || !booking.time) {
      toast.error("Selecione uma data e um horário.");
      return;
    }

    try {
      setIsSubmittingAppointment(true);

      const scheduledAt = `${booking.date}T${booking.time}:00`;

      await createAppointment({
        patientId,
        professionalId: booking.professional.id,
        scheduledAt,
        notes: null,
      });

      toast.success("Consulta agendada com sucesso!");
      navigate("/my-appoiments-patient");
    } catch (error) {
      console.error("Erro ao confirmar consulta:", error);

      toast.error(
        getApiErrorMessage(error) || "Não foi possível confirmar a consulta.",
      );
    } finally {
      setIsSubmittingAppointment(false);
    }
  }

  const selectedDate = availableDates.find(
    (date) => date.value === booking.date,
  );

  return {
    step,
    search,
    setSearch,
    booking,
    filteredSpecialties,
    filteredProfessionals,
    availableDates,
    availableTimes: filteredTimes,
    selectedDate,
    isLoadingSpecialties,
    specialtiesError,
    isLoadingProfessionals,
    professionalsError,
    isLoadingAvailability,
    availabilityError,
    isSubmittingAppointment,
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
