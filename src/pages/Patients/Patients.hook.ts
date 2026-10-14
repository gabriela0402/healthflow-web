import { mockPatients } from "./Patients.utils";
import { useMemo, useState } from "react";

export function usePatients() {
  const [search, setSearch] = useState("");

  const filteredPatients = mockPatients.filter((patient) => {
    const searchValue = search.toLowerCase();

    return (
      patient.fullName.toLowerCase().includes(searchValue) ||
      patient.email.toLowerCase().includes(searchValue)
    );
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  function toggleMoreFilters() {
    setShowMoreFilters((previous) => !previous);
  }

  return {
    search,
    setSearch,
    patients: filteredPatients,
    showMoreFilters,
    toggleMoreFilters,
  };
}
