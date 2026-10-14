import { useState } from "react";
import type { ProfessionalForm } from "./ProfessionalCreate.types";

const initialForm: ProfessionalForm = {
  fullName: "",
  email: "",
  phone: "",
  specialty: "",
  registrationNumber: "",
};

export function useProfessionalCreate() {
  const [form, setForm] =
    useState<ProfessionalForm>(initialForm);

  function handleChange(
    field: keyof ProfessionalForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit() {
    console.log("Profissional cadastrado:", form);
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
