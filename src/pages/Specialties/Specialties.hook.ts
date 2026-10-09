import { useState } from "react";
import { specialties as allSpecialties } from "./Specialties.utils";

export function useSpecialties() {
  const [search, setSearch] = useState("");

  const filteredSpecialties = allSpecialties.filter(
    (specialty) => {
      const searchValue = search.toLowerCase().trim();

      return (
        specialty.name
          .toLowerCase()
          .includes(searchValue) ||
        specialty.description
          .toLowerCase()
          .includes(searchValue)
      );
    },
  );

  return {
    search,
    setSearch,
    specialties: filteredSpecialties,
  };
}
