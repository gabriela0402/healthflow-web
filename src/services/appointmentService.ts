import { api } from "./api";
import type { AppointmentResponse } from "../types/appointment";

export async function getMyAppointments(signal?: AbortSignal) {
  const { data } = await api.get<AppointmentResponse[]>(
    "/appointments/me",
    { signal },
  );

  return data;
}