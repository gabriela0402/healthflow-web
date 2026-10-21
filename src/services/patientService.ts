import { api } from "./api";
import type {
  PatientProfileResponse,
  UpdatePatientProfilePayload,
} from "../types/patient";

export async function getMyProfile(signal?: AbortSignal) {
  const { data } = await api.get<PatientProfileResponse>("/patients/me", {
    signal,
  });
  return data;
}

export async function updateMyProfile(payload: UpdatePatientProfilePayload) {
  const { data } = await api.put<PatientProfileResponse>(
    "/patients/me",
    payload,
  );
  return data;
}