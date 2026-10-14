import { useMemo, useState } from "react";
import { specialties } from "./Specialties.utils";

export function useSpecialties() {
  const [search, setSearch] = useState("");
  const [showMoreFilters, setShowMoreFilters] =
    useState(false);

  const [sort, setSort] = useState("default");

  const filteredSpecialties = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    const result = specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(searchValue),
    );

    if (sort === "name-asc") {
      return [...result].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    if (sort === "name-desc") {
      return [...result].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
    }

    return result;
  }, [search, sort]);

  function toggleMoreFilters() {
    setShowMoreFilters((previous) => !previous);
  }

  return {
    search,
    setSearch,
    sort,
    setSort,
    specialties: filteredSpecialties,
    showMoreFilters,
    toggleMoreFilters,
  };
}
