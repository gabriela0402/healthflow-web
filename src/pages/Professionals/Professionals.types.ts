import type {
  Professional,
  ProfessionalAvailability,
} from "../PatientBooking/PatientBooking.types";

export type ProfessionalListItem = Professional & {
  availabilities: ProfessionalAvailability[];
  nextAvailability: string | null;
  isAvailable: boolean;
};

export type StatusFilter = "" | "available" | "unavailable";