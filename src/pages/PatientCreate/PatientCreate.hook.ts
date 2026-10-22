import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import { createPatient } from "../../services/patientService";
import { formatCpf } from "../PatientData/PatientData.utils";
import type { PatientForm } from "./PatientCreate.types";

const initialForm: PatientForm = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
  birthDate: "",
  gender: "none",
  cpf: "",
  address: "",
};

export function usePatientCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState<PatientForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: keyof PatientForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: field === "cpf" ? formatCpf(value) : value,
    }));
  }

  async function handleSubmit() {
    if (form.fullName.trim().length < 3) {
      toast.error("Informe o nome completo.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Informe o e-mail.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("A senha inicial deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setIsLoading(true);

      await createPatient({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim() || null,
        dateOfBirth: form.birthDate || null,
        gender: form.gender === "none" ? null : form.gender,
        cpf: form.cpf.trim() || null,
        address: form.address.trim() || null,
      });

      toast.success("Paciente cadastrado com sucesso!");
      navigate("/patients", { replace: true });
    } catch (error) {
      console.error("Erro ao cadastrar paciente:", error);

      toast.error(
        getApiErrorMessage(error, "Não foi possível cadastrar o paciente."),
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setForm(initialForm);
  }

  return {
    form,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}