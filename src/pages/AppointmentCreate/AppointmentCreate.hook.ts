import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import { createAppointment } from "../../services/appointmentService";
import {
  getPatients,
  type PatientSummary,
} from "../../services/patientService";
import {
  getProfessionalAvailability,
  getProfessionals,
} from "../../services/professionalService";
import { getSpecialties } from "../../services/specialtyService";
import type {
  Professional,
  ProfessionalAvailability,
  Specialty,
} from "../PatientBooking/PatientBooking.types";
import type { AppointmentForm } from "./AppointmentCreate.types";

import { getAvailableDays, getTimeSlots } from "./AppointmentCreate.utils";


const initialForm: AppointmentForm = {
  patientId: "",
  professionalId: "",
  specialtyId: "",
  date: "",
  time: "",
  notes: "",
};

export function useAppointmentCreate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState<AppointmentForm>({
    ...initialForm,
    patientId: searchParams.get("patientId") ?? "",
  });

  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [availabilities, setAvailabilities] = useState<
    ProfessionalAvailability[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [patientsData, specialtiesData, professionalsData] =
          await Promise.all([
            getPatients(controller.signal),
            getSpecialties(controller.signal),
            getProfessionals(controller.signal),
          ]);

        setPatients(patientsData);
        setSpecialties(specialtiesData);
        setProfessionals(professionalsData);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setLoadError(
          getApiErrorMessage(err, "Não foi possível carregar os dados."),
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!form.professionalId) {
      setAvailabilities([]);
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setIsLoadingAvailability(true);

        setAvailabilities(
          await getProfessionalAvailability(
            Number(form.professionalId),
            controller.signal,
          ),
        );
      } catch (err) {
        if (axios.isCancel(err)) return;
        setAvailabilities([]);
        toast.error("Não foi possível carregar a disponibilidade.");
      } finally {
        if (!controller.signal.aborted) setIsLoadingAvailability(false);
      }
    }

    load();

    return () => controller.abort();
  }, [form.professionalId]);

  const filteredProfessionals = useMemo(
    () =>
      professionals.filter(
        (professional) => professional.specialtyId === Number(form.specialtyId),
      ),
    [professionals, form.specialtyId],
  );

  const timeSlots = useMemo(
    () => getTimeSlots(form.date, availabilities),
    [form.date, availabilities],
  );

  const availableDays = useMemo(
    () => getAvailableDays(availabilities),
    [availabilities],
  );

  function handleChange(field: keyof AppointmentForm, value: string) {
    const clean = value === "none" ? "" : value;

    setForm((previous) => {
      const next = { ...previous, [field]: clean };

      if (field === "specialtyId") {
        next.professionalId = "";
        next.date = "";
        next.time = "";
      }

      if (field === "professionalId") {
        next.date = "";
        next.time = "";
      }

      if (field === "date") {
        next.time = "";
      }

      return next;
    });
  }

  async function handleSubmit() {
    if (!form.patientId) return toast.error("Selecione o paciente.");
    if (!form.specialtyId) return toast.error("Selecione a especialidade.");
    if (!form.professionalId) return toast.error("Selecione o profissional.");
    if (!form.date || !form.time) {
      return toast.error("Selecione a data e o horário.");
    }

    try {
      setIsSubmitting(true);

      await createAppointment({
        patientId: Number(form.patientId),
        professionalId: Number(form.professionalId),
        scheduledAt: `${form.date}T${form.time}:00`,
        notes: form.notes.trim() || null,
      });

      toast.success("Agendamento cadastrado com sucesso!");
      navigate("/appointments", { replace: true });
    } catch (err) {
      console.error("Erro ao cadastrar agendamento:", err);

      toast.error(
        getApiErrorMessage(err, "Não foi possível cadastrar o agendamento."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setForm(initialForm);
  }

  return {
    form,
    patients,
    specialties,
    filteredProfessionals,
    availableDays,
    timeSlots,
    isLoading,
    loadError,
    isLoadingAvailability,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
