import type { NotificationResponse } from "../../types/notification";
import type { PatientNotification } from "./PatientNotifications.types";

export function mapNotification(item: NotificationResponse): PatientNotification {
  const created = new Date(item.createdAt);

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    date: created.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: created.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    type: item.type,
    read: item.isRead,
  };
}