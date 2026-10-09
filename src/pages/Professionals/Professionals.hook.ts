import { useState } from "react";
import { mockProfessionals } from "./Professionals.utils";

export function useProfessionals() {
  const [search, setSearch] = useState("");

  const filteredProfessioanals = mockProfessionals.filter((professional) => {
    const searchValue = search.toLowerCase();

    return (
      professional.fullName.toLowerCase().includes(searchValue) ||
      professional.email.toLowerCase().includes(searchValue)
    );
  });

  return {
    search,
    setSearch,
    professionals: filteredProfessioanals,
  };
}
