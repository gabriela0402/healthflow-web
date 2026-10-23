import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  createSpecialty,
  getSpecialties,
  updateSpecialty,
} from "../../services/specialtyService";
import type { SpecialtyForm } from "./SpecialtyCreate.types";

const initialForm: SpecialtyForm = { name: "", description: "" };

export function useSpecialtyCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const specialtyId = id ? Number(id) : null;
  const isEditing = specialtyId !== null;

  const [form, setForm] = useState<SpecialtyForm>(initialForm);
  const [savedForm, setSavedForm] = useState<SpecialtyForm>(initialForm);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const controller = new AbortController();

    async function load() {
      try {
        const list = await getSpecialties(controller.signal);
        const current = list.find((item) => item.id === specialtyId);

        if (!current) {
          toast.error("Especialidade não encontrada.");
          navigate("/specialties", { replace: true });
          return;
        }

        const data = {
          name: current.name,
          description: current.description ?? "",
        };

        setForm(data);
        setSavedForm(data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        toast.error(getApiErrorMessage(err, "Não foi possível carregar a especialidade."));
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [specialtyId, isEditing, navigate]);

  function handleChange(field: keyof SpecialtyForm, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSubmit() {
    if (form.name.trim().length < 3) {
      toast.error("Informe o nome da especialidade.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
    };

    try {
      setIsSubmitting(true);

      if (isEditing) {
        await updateSpecialty(specialtyId, payload);
        toast.success("Especialidade atualizada com sucesso!");
      } else {
        await createSpecialty(payload);
        toast.success("Especialidade cadastrada com sucesso!");
      }

      navigate("/specialties", { replace: true });
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Não foi possível salvar a especialidade."));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setForm(isEditing ? savedForm : initialForm);
  }

  return { form, isEditing, isLoading, isSubmitting, handleChange, handleSubmit, handleCancel };
}