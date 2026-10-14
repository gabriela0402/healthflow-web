import { useState } from "react";
import type { AppointmentForm } from "./AppointmentCreate.types";

const initialForm: AppointmentForm = {
  patientId: "",
  professionalId: "",
  specialtyId: "",
  date: "",
  time: "",
  notes: "",
};

export function useAppointmentCreate() {
  const [form, setForm] =
    useState<AppointmentForm>(initialForm);

  function handleChange(
    field: keyof AppointmentForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit() {
    console.log("Agendamento cadastrado:", form);
  }

  function handleCancel() {
    setForm(initialForm);
  }

  return {
    form,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
