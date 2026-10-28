import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { updateSessionName } from "../../auth/session";
import { getApiErrorMessage } from "../../services/apiError";
import {
  getMyAvailability,
  getMyProfile,
  updateMyProfile,
} from "../../services/professionalService";
import type { ProfessionalProfileResponse } from "../../types/professional";
import { toDayIndex } from "../ProfessionalSchedule/ProfessionalSchedule.utils";
import type {
  ProfessionalProfileData,
  WeekdayAvailability,
} from "./ProfessionalProfile.types";

const emptyProfile: ProfessionalProfileData = {
  fullName: "",
  email: "",
  phone: "",
  specialty: "",
  registration: "",
};

// Segunda a domingo (0 = domingo)
const WEEK = [
  { id: 1, label: "Segunda-feira" },
  { id: 2, label: "Terça-feira" },
  { id: 3, label: "Quarta-feira" },
  { id: 4, label: "Quinta-feira" },
  { id: 5, label: "Sexta-feira" },
  { id: 6, label: "Sábado" },
  { id: 0, label: "Domingo" },
];

function toProfile(data: ProfessionalProfileResponse): ProfessionalProfileData {
  return {
    fullName: data.fullName,
    email: data.email ?? "",
    phone: data.phone ?? "",
    specialty: data.specialtyName,
    registration: data.registrationNumber,
  };
}

export function useProfessionalProfile() {
  const [profile, setProfile] = useState<ProfessionalProfileData>(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<ProfessionalProfileData>(emptyProfile);
  const [workingDays, setWorkingDays] = useState<Set<number>>(new Set());

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [data, availabilities] = await Promise.all([
          getMyProfile(controller.signal),
          getMyAvailability(controller.signal),
        ]);

        const loaded = toProfile(data);

        setProfile(loaded);
        setSavedProfile(loaded);
        setWorkingDays(
          new Set(
            availabilities
              .map((item) => toDayIndex(item.dayOfWeek))
              .filter((day): day is number => day !== null),
          ),
        );
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getApiErrorMessage(err, "Não foi possível carregar o perfil."));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const availability = useMemo<WeekdayAvailability[]>(
    () => WEEK.map((day) => ({ ...day, enabled: workingDays.has(day.id) })),
    [workingDays],
  );

  const isDirty = useMemo(
    () => JSON.stringify(profile) !== JSON.stringify(savedProfile),
    [profile, savedProfile],
  );

  function handleProfileChange(field: keyof ProfessionalProfileData, value: string) {
    setProfile((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSave() {
    if (profile.fullName.trim().length < 3) {
      toast.error("Informe o nome completo.");
      return;
    }

    try {
      setSaving(true);

      const data = toProfile(
        await updateMyProfile({
          fullName: profile.fullName.trim(),
          phone: profile.phone.trim() || null,
        }),
      );

      setProfile(data);
      setSavedProfile(data);
      updateSessionName(data.fullName);

      toast.success("Perfil atualizado com sucesso!");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Não foi possível salvar o perfil."));
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setProfile(savedProfile);
  }

  return {
    profile,
    availability,
    loading,
    saving,
    isDirty,
    error,
    reload: () => setReloadKey((key) => key + 1),
    handleProfileChange,
    handleSave,
    handleCancel,
  };
}