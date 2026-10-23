import { api } from "./api";
import type { Specialty } from "../pages/PatientBooking/PatientBooking.types";
import type { SpecialtyPayload } from "../types/specialty";


export async function getSpecialties(signal?: AbortSignal) {
  const { data } = await api.get<Specialty[]>("/specialties", { signal });
  return data;
}

export async function createSpecialty(payload: SpecialtyPayload) {
  const { data } = await api.post("/specialties", payload);
  return data;
}

export async function updateSpecialty(id: number, payload: SpecialtyPayload) {
  const { data } = await api.put(`/specialties/${id}`, payload);
  return data;
}

export async function deleteSpecialty(id: number) {
  await api.delete(`/specialties/${id}`);
}