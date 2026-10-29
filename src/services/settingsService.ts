import { api } from "./api";
import type { ClinicSettingsResponse, SettingsUser } from "../types/settings";

export async function getClinicSettings(signal?: AbortSignal) {
  const { data } = await api.get<ClinicSettingsResponse>("/settings/clinic", { signal });
  return data;
}

export async function updateClinicSettings(payload: ClinicSettingsResponse) {
  const { data } = await api.put<ClinicSettingsResponse>("/settings/clinic", payload);
  return data;
}

export async function getSettingsUsers(signal?: AbortSignal) {
  const { data } = await api.get<SettingsUser[]>("/settings/users", { signal });
  return data;
}