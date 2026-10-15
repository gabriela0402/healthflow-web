import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import type { RegisterForm } from "./Register.types";

const initialForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<RegisterForm>(initialForm);

  const [isLoading, setIsLoading] =
    useState(false);

  function handleChange(
    field: keyof RegisterForm,
    value: string,
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);

      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Cadastro realizado com sucesso!");

      setForm(initialForm);

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error: any) {
      console.error(
        "Erro ao realizar cadastro:",
        error,
      );

      const message =
        error.response?.data?.message ??
        "Não foi possível realizar o cadastro.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    isLoading,
    handleChange,
    handleSubmit,
  };
}
