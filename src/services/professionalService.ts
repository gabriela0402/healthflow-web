import { api } from "./api";
import type {
  Professional,
  ProfessionalAvailability,
} from "../pages/PatientBooking/PatientBooking.types";

import type {
  ProfessionalAdminResponse,
  UpdateProfessionalPayload,
  CreateAvailabilityPayload 
} from "../types/professional";

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

export type CreateProfessionalPayload = {
  fullName: string;
  registrationNumber: string;
  specialtyId: number;
};

export async function getProfessionalsOverview(signal?: AbortSignal) {
  const { data } = await api.get<ProfessionalAdminResponse[]>(
    "/professionals/overview",
    { signal },
  );
  return data;
}

export async function createProfessional(payload: CreateProfessionalPayload) {
  const { data } = await api.post("/professionals", payload);
  return data;
}

export async function updateProfessional(
  id: number,
  payload: UpdateProfessionalPayload,
) {
  const { data } = await api.put(`/professionals/${id}`, payload);
  return data;
}

export async function deleteProfessional(id: number) {
  await api.delete(`/professionals/${id}`);
}

export async function getMyAvailability(signal?: AbortSignal) {
  const { data } = await api.get<ProfessionalAvailability[]>(
    "/professionals/me/availability",
    { signal },
  );
  return data;
}

export async function createMyAvailability(payload: CreateAvailabilityPayload) {
  const { data } = await api.post("/professionals/me/availability", payload);
  return data;
}