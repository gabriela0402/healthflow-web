import { useState } from "react";
import { mockPatients } from "./Patients.utils";

export function usePatients() {
  const [search, setSearch] = useState("");

  const filteredPatients = mockPatients.filter((patient) => {
    const searchValue = search.toLowerCase();

    return (
      patient.fullName.toLowerCase().includes(searchValue) ||
      patient.email.toLowerCase().includes(searchValue)
    );
  });

  return {
    search,
    setSearch,
    patients: filteredPatients,
  };
}
