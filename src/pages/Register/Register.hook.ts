import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { RegisterForm } from "./Register.types";
import { getApiErrorMessage } from "../../services/apiError";
import * as authService from "../../services/authService";

const initialForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function useRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>(initialForm);

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: keyof RegisterForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      setIsLoading(true);

      await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Cadastro realizado com sucesso!");

      setForm(initialForm);

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);

      toast.error(
        getApiErrorMessage(error, "Não foi possível realizar o cadastro."),
      );
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
