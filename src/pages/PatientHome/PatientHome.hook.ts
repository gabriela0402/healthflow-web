import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function usePatientHome() {
  const navigate = useNavigate();

  const [isSpecialtiesModalOpen, setIsSpecialtiesModalOpen] =
    useState(false);

  function openSpecialtiesModal() {
    setIsSpecialtiesModalOpen(true);
  }

  function closeSpecialtiesModal() {
    setIsSpecialtiesModalOpen(false);
  }

  function handleSchedule(specialtyId: number) {
    setIsSpecialtiesModalOpen(false);

    navigate(
      `/book-appointment?specialtyId=${specialtyId}`,
    );
  }

  return {
    isSpecialtiesModalOpen,
    openSpecialtiesModal,
    closeSpecialtiesModal,
    handleSchedule,
  };
}
