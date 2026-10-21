import { api } from "./api";
import type {
  Professional,
  ProfessionalAvailability,
} from "../pages/PatientBooking/PatientBooking.types";

export async function getProfessionals(signal?: AbortSignal) {
  const { data } = await api.get<Professional[]>("/professionals", { signal });
  return data;
}

export async function getProfessionalAvailability(
  professionalId: number,
  signal?: AbortSignal,
) {
  const { data } = await api.get<ProfessionalAvailability[]>(
    `/professionals/${professionalId}/availability`,
    { signal },
  );
  return data;
}