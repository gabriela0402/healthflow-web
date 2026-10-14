import { useState } from "react";
import type { PatientForm } from "./PatientCreate.types";

const initialForm: PatientForm = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  cpf: "",
  address: "",
};

export function usePatientCreate() {
  const [form, setForm] =
    useState<PatientForm>(initialForm);

  function handleChange(
    field: keyof PatientForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit() {
    console.log("Paciente cadastrado:", form);
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
