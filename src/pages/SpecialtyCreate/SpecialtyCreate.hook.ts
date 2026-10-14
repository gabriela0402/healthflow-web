import { useState } from "react";
import type { SpecialtyForm } from "./SpecialtyCreate.types";

const initialForm: SpecialtyForm = {
  name: "",
  description: "",
};

export function useSpecialtyCreate() {
  const [form, setForm] =
    useState<SpecialtyForm>(initialForm);

  function handleChange(
    field: keyof SpecialtyForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit() {
    console.log("Especialidade cadastrada:", form);
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
