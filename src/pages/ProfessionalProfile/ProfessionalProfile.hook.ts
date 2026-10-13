import { useState } from "react";
import type {
  ProfessionalProfileData,
  WeekdayAvailability,
} from "./ProfessionalProfile.types";

const initialProfile: ProfessionalProfileData = {
  fullName: "Dra. Sarah Miller",
  email: "sarah.miller@clinicaexample.com.br",
  phone: "(11) 3456-7890",
  specialty: "Cardiologista",
  registration: "CRM-SP 123.456",
};

const initialAvailability: WeekdayAvailability[] = [
  {
    id: "monday",
    label: "Segunda-feira",
    enabled: true,
  },
  {
    id: "tuesday",
    label: "Terça-feira",
    enabled: true,
  },
  {
    id: "wednesday",
    label: "Quarta-feira",
    enabled: true,
  },
  {
    id: "thursday",
    label: "Quinta-feira",
    enabled: true,
  },
  {
    id: "friday",
    label: "Sexta-feira",
    enabled: true,
  },
  {
    id: "saturday",
    label: "Sábado",
    enabled: false,
  },
  {
    id: "sunday",
    label: "Domingo",
    enabled: false,
  },
];

export function useProfessionalProfile() {
  const [profile, setProfile] =
    useState<ProfessionalProfileData>(initialProfile);

  const [availability, setAvailability] =
    useState<WeekdayAvailability[]>(
      initialAvailability,
    );

  function handleProfileChange(
    field: keyof ProfessionalProfileData,
    value: string,
  ) {
    setProfile((previousProfile) => ({
      ...previousProfile,
      [field]: value,
    }));
  }

  function toggleAvailability(id: string) {
    setAvailability((previousAvailability) =>
      previousAvailability.map((day) =>
        day.id === id
          ? {
              ...day,
              enabled: !day.enabled,
            }
          : day,
      ),
    );
  }

  function handleSave() {
    console.log("Perfil salvo:", {
      profile,
      availability,
    });
  }

  function handleCancel() {
    setProfile(initialProfile);
    setAvailability(initialAvailability);
  }

  return {
    profile,
    availability,
    handleProfileChange,
    toggleAvailability,
    handleSave,
    handleCancel,
  };
}
