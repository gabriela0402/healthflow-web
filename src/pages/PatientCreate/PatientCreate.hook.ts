import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  createPatient,
  getPatientProfile,
  updatePatient,
} from "../../services/patientService";
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
  const { id } = useParams();
  const patientId = id ? Number(id) : null;
  const isEditing = patientId !== null;

  const [form, setForm] = useState<PatientForm>(initialForm);
  const [savedForm, setSavedForm] = useState<PatientForm>(initialForm);
  const [isFetching, setIsFetching] = useState(isEditing);
  const [isLoading, setIsLoading] = useState(false);

  const emergency = useRef({ name: null as string | null, phone: null as string | null });

  useEffect(() => {
    if (!isEditing) return;

    const controller = new AbortController();

    async function load() {
      try {
        const data = await getPatientProfile(patientId!, controller.signal);

        const loaded: PatientForm = {
          fullName: data.fullName,
          email: data.email,
          password: "",
          phone: data.phone ?? "",
          birthDate: data.dateOfBirth?.slice(0, 10) ?? "",
          gender: data.gender ?? "none",
          cpf: data.cpf ? formatCpf(data.cpf) : "",
          address: data.address ?? "",
        };

        emergency.current = {
          name: data.emergencyContactName,
          phone: data.emergencyContactPhone,
        };

        setForm(loaded);
        setSavedForm(loaded);
      } catch (err) {
        if (axios.isCancel(err)) return;
        toast.error(getApiErrorMessage(err, "Não foi possível carregar o paciente."));
        navigate("/patients", { replace: true });
      } finally {
        if (!controller.signal.aborted) setIsFetching(false);
      }
    }

    load();

    return () => controller.abort();
  }, [isEditing, patientId, navigate]);

  function handleChange(field: keyof PatientForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: field === "cpf" ? formatCpf(value) : value,
    }));
  }

  async function handleSubmit() {
    if (form.fullName.trim().length < 3) return toast.error("Informe o nome completo.");

    if (!isEditing) {
      if (!form.email.trim()) return toast.error("Informe o e-mail.");
      if (form.password.length < 6) {
        return toast.error("A senha inicial deve ter pelo menos 6 caracteres.");
      }
    }

    const gender = form.gender === "none" ? null : form.gender;

    try {
      setIsLoading(true);

      if (isEditing) {
        await updatePatient(patientId, {
          fullName: form.fullName.trim(),
          phone: form.phone.trim() || null,
          dateOfBirth: form.birthDate || null,
          gender,
          cpf: form.cpf.trim() || null,
          address: form.address.trim() || null,
          emergencyContactName: emergency.current.name,
          emergencyContactPhone: emergency.current.phone,
        });

        toast.success("Paciente atualizado com sucesso!");
      } else {
        await createPatient({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim() || null,
          dateOfBirth: form.birthDate || null,
          gender,
          cpf: form.cpf.trim() || null,
          address: form.address.trim() || null,
        });

        toast.success("Paciente cadastrado com sucesso!");
      }

      navigate("/patients", { replace: true });
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Não foi possível salvar o paciente."));
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setForm(isEditing ? savedForm : initialForm);
  }

  return {
    form,
    isEditing,
    isFetching,
    isLoading,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}