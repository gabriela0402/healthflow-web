import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { getApiErrorMessage } from "../../services/apiError";
import {
  createProfessional,
  getProfessionalsOverview,
  updateProfessional,
} from "../../services/professionalService";
import { getSpecialties } from "../../services/specialtyService";
import type { Specialty } from "../PatientBooking/PatientBooking.types";
import type { ProfessionalForm } from "./ProfessionalCreate.types";

const initialForm: ProfessionalForm = {
  fullName: "",
  email: "",
  password: "",
  specialtyId: "",
  registrationNumber: "",
};

import { toast } from "react-toastify";

export function useProfessionalCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const professionalId = id ? Number(id) : null;
  const isEditing = professionalId !== null;

  const [form, setForm] = useState<ProfessionalForm>(initialForm);
  const [savedForm, setSavedForm] = useState<ProfessionalForm>(initialForm);
  const [hasLogin, setHasLogin] = useState(false);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const specialtiesData = await getSpecialties(controller.signal);
        setSpecialties(specialtiesData);

        if (!isEditing) return;

        const list = await getProfessionalsOverview(controller.signal);
        const current = list.find((item) => item.id === professionalId);

        if (!current) {
          navigate("/professionals", {
            replace: true,
            state: { toast: "Profissional não encontrado." },
          });
          return;
        }

        const data: ProfessionalForm = {
          fullName: current.fullName,
          email: current.email ?? "",
          password: "",
          specialtyId: String(current.specialtyId),
          registrationNumber: current.registrationNumber,
        };

        setForm(data);
        setSavedForm(data);
        setHasLogin(Boolean(current.email));
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(
          getApiErrorMessage(err, "Não foi possível carregar os dados."),
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [isEditing, professionalId, navigate]);

  function handleChange(field: keyof ProfessionalForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit() {
    if (form.fullName.trim().length < 3) {
      return toast.error("Informe o nome completo do profissional.");
    }
    if (!form.specialtyId) {
      return toast.error("Selecione a especialidade.");
    }
    if (!form.registrationNumber.trim()) {
      return toast.error("Informe o registro profissional.");
    }

    if (!isEditing) {
      if (!form.email.trim())
        return toast.error("Informe o e-mail do profissional.");
      if (form.password.length < 6) {
        return toast.error("A senha inicial deve ter pelo menos 6 caracteres.");
      }
    } else if (!hasLogin && form.email.trim() && form.password.length < 6) {
      return toast.error(
        "Informe uma senha de pelo menos 6 caracteres para criar o acesso.",
      );
    } else if (hasLogin && form.password && form.password.length < 6) {
      return toast.error("A nova senha deve ter pelo menos 6 caracteres.");
    }

    try {
      setSubmitting(true);

      if (isEditing) {
        await updateProfessional(professionalId, {
          fullName: form.fullName.trim(),
          registrationNumber: form.registrationNumber.trim(),
          specialtyId: Number(form.specialtyId),
          email: hasLogin ? null : form.email.trim() || null,
          newPassword: form.password || null,
        });
        toast.success("Profissional atualizado com sucesso!");
      } else {
        await createProfessional({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
          registrationNumber: form.registrationNumber.trim(),
          specialtyId: Number(form.specialtyId),
        });
        toast.success("Profissional cadastrado com sucesso!");
      }

      navigate("/professionals", { replace: true });
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível salvar o profissional."),
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    setForm(isEditing ? savedForm : initialForm);
    setError(null);
  }

  return {
    form,
    specialties,
    isEditing,
    hasLogin,
    loading,
    submitting,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
    clearError: () => setError(null),
  };
}
