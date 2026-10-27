import type { ProfessionalAdminResponse } from "../../types/professional";
import type { ProfessionalAvailability } from "../PatientBooking/PatientBooking.types";

export type ProfessionalListItem = ProfessionalAdminResponse & {
  availabilities: ProfessionalAvailability[];
  nextAvailability: string | null;
  isAvailable: boolean;
};

export type StatusFilter = "all" | "available" | "unavailable";