import { api } from "./api";
import type { AppointmentResponse } from "../types/appointment";

export async function getMyAppointments(signal?: AbortSignal) {
  const { data } = await api.get<AppointmentResponse[]>(
    "/appointments/me",
    { signal },
  );

  return data;
}

export type CreateAppointmentPayload = {
  patientId: number;
  professionalId: number;
  scheduledAt: string; // "2026-10-22T08:00:00", sem fuso
  notes?: string | null;
};

export async function createAppointment(payload: CreateAppointmentPayload) {
  const { data } = await api.post("/appointments", payload);
  return data;
}

import type { AppointmentAdminResponse } from "../types/appointment";

export async function getAppointmentsOverview(signal?: AbortSignal) {
  const { data } = await api.get<AppointmentAdminResponse[]>(
    "/appointments/overview",
    { signal },
  );
  return data;
}

export async function confirmAppointment(id: number) {
  await api.put(`/appointments/${id}/confirm`);
}

export async function completeAppointment(id: number) {
  await api.put(`/appointments/${id}/complete`);
}

export async function cancelAppointment(id: number) {
  await api.put(`/appointments/${id}/cancel`);
}