import { useState } from "react";
import type {
  ClinicFormData,
  SettingsTab,
} from "./Settings.types";

export function useSettings() {
  const [activeTab, setActiveTab] =
    useState<SettingsTab>("clinic");

  const [clinicData, setClinicData] =
    useState<ClinicFormData>({
      clinicName: "Clínica Vida Saudável",
      email: "contato@vidasaudavel.com.br",
      phone: "(11) 3456-7890",
      address:
        "Rua das Flores, 123 - São Paulo - SP",
    });

  const [appointmentReminders, setAppointmentReminders] =
    useState(true);

  const [automaticConfirmation, setAutomaticConfirmation] =
    useState(true);

  function handleClinicChange(
    field: keyof ClinicFormData,
    value: string,
  ) {
    setClinicData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSave() {
    console.log("Dados salvos:", clinicData);
  }

  return {
    activeTab,
    setActiveTab,
    clinicData,
    handleClinicChange,
    handleSave,
    appointmentReminders,
    setAppointmentReminders,
    automaticConfirmation,
    setAutomaticConfirmation,
  };
}
