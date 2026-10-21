import { api } from "./api";
import type { Specialty } from "../pages/PatientBooking/PatientBooking.types";

export async function getSpecialties(signal?: AbortSignal) {
  const { data } = await api.get<Specialty[]>("/specialties", { signal });
  return data;
}