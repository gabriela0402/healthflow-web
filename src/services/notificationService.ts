import { api } from "./api";
import type {
  NotificationPreferencesPayload,
  NotificationResponse,
} from "../types/notification";

export async function getMyNotifications(signal?: AbortSignal) {
  const { data } = await api.get<NotificationResponse[]>("/notifications/me", { signal });
  return data;
}

export async function markNotificationAsRead(id: number) {
  await api.put(`/notifications/${id}/read`);
}

export async function markAllNotificationsAsRead() {
  await api.put("/notifications/read-all");
}

export async function getNotificationPreferences(signal?: AbortSignal) {
  const { data } = await api.get<NotificationPreferencesPayload>(
    "/notifications/preferences/me",
    { signal },
  );
  return data;
}

export async function updateNotificationPreferences(payload: NotificationPreferencesPayload) {
  const { data } = await api.put<NotificationPreferencesPayload>(
    "/notifications/preferences/me",
    payload,
  );
  return data;
}