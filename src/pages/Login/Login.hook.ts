import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getHomeRoute } from "../../auth/getHomeRoute";
import { saveSession } from "../../auth/session";
import { getApiErrorMessage } from "../../services/apiError";
import * as authService from "../../services/authService";
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

  async function handleSubmit() {
    if (!form.email || !form.password) {
      toast.error("Preencha o e-mail e a senha.");
      return;
    }

    try {
      setIsLoading(true);

      const data = await authService.login({
        email: form.email,
        password: form.password,
      });

      saveSession(data);

      toast.success("Login realizado com sucesso!");

      navigate(getHomeRoute(data.role), { replace: true });
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      toast.error(
        getApiErrorMessage(error, "Não foi possível realizar o login."),
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