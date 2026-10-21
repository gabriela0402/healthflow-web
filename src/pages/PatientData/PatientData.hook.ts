import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { updateSessionName } from "../../auth/session";
import { getApiErrorMessage } from "../../services/apiError";
import { getMyProfile, updateMyProfile } from "../../services/patientService";
import type { PatientDataForm } from "./PatientData.types";
import { emptyForm, formatCpf, toForm, toPayload } from "./PatientData.utils";

export function usePatientData() {
  const [form, setForm] = useState<PatientDataForm>(emptyForm);
  const [savedForm, setSavedForm] = useState<PatientDataForm>(emptyForm);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const data = toForm(await getMyProfile(controller.signal));

        setForm(data);
        setSavedForm(data);
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(getApiErrorMessage(err, "Não foi possível carregar seus dados."));
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(savedForm),
    [form, savedForm],
  );

  function handleChange(field: keyof PatientDataForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: field === "cpf" ? formatCpf(value) : value,
    }));
  }

  async function handleSave() {
    if (form.fullName.trim().length < 3) {
      toast.error("Informe o nome completo.");
      return;
    }

    try {
      setIsSaving(true);

      const data = toForm(await updateMyProfile(toPayload(form)));

      setForm(data);
      setSavedForm(data);
      updateSessionName(data.fullName);

      toast.success("Dados atualizados com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar dados do paciente:", err);

      toast.error(getApiErrorMessage(err, "Não foi possível salvar os dados."));
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setForm(savedForm);
  }

  return {
    form,
    isLoading,
    isSaving,
    isDirty,
    error,
    reload: () => setReloadKey((key) => key + 1),
    handleChange,
    handleSave,
    handleCancel,
  };
}