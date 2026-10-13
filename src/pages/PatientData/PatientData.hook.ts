import { useState } from "react";
import type { PatientDataForm } from "./PatientData.types";

const initialData: PatientDataForm = {
  fullName: "Gabriela Silva",
  email: "gabriela.silva@email.com.br",
  phone: "(11) 98765-4321",
  birthDate: "15/04/1990",
  gender: "Feminino",
  cpf: "123.456.789-00",
  address: "Rua das Flores, 123 - Jardim Paulista, São Paulo - SP",
  emergencyContactName: "Maria Silva",
  emergencyContactPhone: "(11) 91234-5678",
};

export function usePatientData() {
  const [form, setForm] =
    useState<PatientDataForm>(initialData);

  function handleChange(
    field: keyof PatientDataForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSave() {
    console.log("Dados do paciente:", form);
  }

  function handleCancel() {
    setForm(initialData);
  }

  return {
    form,
    handleChange,
    handleSave,
    handleCancel,
  };
}
