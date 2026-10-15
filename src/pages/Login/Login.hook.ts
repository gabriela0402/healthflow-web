import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { api } from "../../services/api";
import type { LoginForm } from "./Login.types";

const initialForm: LoginForm = {
  email: "",
  password: "",
};

export function useLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginForm>(initialForm);

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(field: keyof LoginForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function getHomeRoute(role?: string) {
    const normalizedRole = role?.toLowerCase();

    if (normalizedRole === "patient" || normalizedRole === "paciente") {
      return "/home";
    }

    if (
      normalizedRole === "professional" ||
      normalizedRole === "profissional"
    ) {
      return "/professional-dashboard";
    }

    return "/dashboard";
  }

  async function handleSubmit() {
    if (!form.email || !form.password) {
      toast.error("Preencha o e-mail e a senha.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const data = response.data;


      localStorage.setItem("token", data.token);

      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      if (data.userId) {
        localStorage.setItem("userId", String(data.userId));
      }

      if (data.name) {
        localStorage.setItem("userName", data.name);
      }

      toast.success("Login realizado com sucesso!");

      navigate(getHomeRoute(data.role), {
        replace: true,
      });

    } catch (error: any) {
      console.error("Erro ao realizar login:", error);

      const status = error.response?.status;

      if (status === 401) {
        toast.error("E-mail ou senha inválidos.");
      } else if (status === 400) {
        toast.error("Verifique os dados informados.");
      } else {
        toast.error("Não foi possível realizar o login.");
      }
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
