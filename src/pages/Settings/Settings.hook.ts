import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { changePassword } from "../../services/authService";
import { getApiErrorMessage } from "../../services/apiError";
import {
  getClinicSettings,
  getSettingsUsers,
  updateClinicSettings,
} from "../../services/settingsService";
import type { ClinicSettingsResponse, SettingsUser } from "../../types/settings";
import type { ClinicFormData, PasswordForm, SettingsTab } from "./Settings.types";

const emptyClinic: ClinicFormData = { clinicName: "", email: "", phone: "", address: "" };
const emptyPassword: PasswordForm = { currentPassword: "", newPassword: "", confirmPassword: "" };

function toForm(data: ClinicSettingsResponse): ClinicFormData {
  return {
    clinicName: data.clinicName,
    email: data.email ?? "",
    phone: data.phone ?? "",
    address: data.address ?? "",
  };
}

export function useSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("clinic");

  const [clinicData, setClinicData] = useState<ClinicFormData>(emptyClinic);
  const [savedClinic, setSavedClinic] = useState<ClinicFormData>(emptyClinic);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [automaticConfirmation, setAutomaticConfirmation] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [users, setUsers] = useState<SettingsUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState<PasswordForm>(emptyPassword);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getClinicSettings(controller.signal);

        setClinicData(toForm(data));
        setSavedClinic(toForm(data));
        setAppointmentReminders(data.appointmentReminders);
        setAutomaticConfirmation(data.automaticConfirmation);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getApiErrorMessage(err, "Não foi possível carregar as configurações."));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    if (activeTab !== "users") return;

    const controller = new AbortController();
    setUsersLoading(true);

    getSettingsUsers(controller.signal)
      .then(setUsers)
      .catch((err) => {
        if (!axios.isCancel(err)) {
          toast.error(getApiErrorMessage(err, "Não foi possível carregar os usuários."));
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setUsersLoading(false);
      });

    return () => controller.abort();
  }, [activeTab]);

  function handleClinicChange(field: keyof ClinicFormData, value: string) {
    setClinicData((previous) => ({ ...previous, [field]: value }));
  }

  async function handleSave() {
    if (clinicData.clinicName.trim().length < 3) {
      toast.error("Informe o nome da clínica.");
      return;
    }

    try {
      setSaving(true);

      const data = await updateClinicSettings({
        clinicName: clinicData.clinicName.trim(),
        email: clinicData.email.trim() || null,
        phone: clinicData.phone.trim() || null,
        address: clinicData.address.trim() || null,
        appointmentReminders,
        automaticConfirmation,
      });

      setClinicData(toForm(data));
      setSavedClinic(toForm(data));
      toast.success("Configurações salvas com sucesso!");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Não foi possível salvar as configurações."));
    } finally {
      setSaving(false);
    }
  }

  function handleCancelClinic() {
    setClinicData(savedClinic);
  }

  function handlePasswordChange(field: keyof PasswordForm, value: string) {
    setPasswordForm((previous) => ({ ...previous, [field]: value }));
  }

  async function handleChangePassword() {
    if (!passwordForm.currentPassword) {
      return toast.error("Informe a senha atual.");
    }
    if (passwordForm.newPassword.length < 6) {
      return toast.error("A nova senha deve ter pelo menos 6 caracteres.");
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return toast.error("As senhas não coincidem.");
    }

    try {
      setChangingPassword(true);

      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      setPasswordForm(emptyPassword);
      toast.success("Senha atualizada com sucesso!");
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Não foi possível atualizar a senha."));
    } finally {
      setChangingPassword(false);
    }
  }

  return {
    activeTab,
    setActiveTab,
    clinicData,
    handleClinicChange,
    handleCancelClinic,
    handleSave,
    saving,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    appointmentReminders,
    setAppointmentReminders,
    automaticConfirmation,
    setAutomaticConfirmation,
    users,
    usersLoading,
    passwordForm,
    handlePasswordChange,
    handleChangePassword,
    changingPassword,
  };
}