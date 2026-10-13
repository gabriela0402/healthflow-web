import { useMemo, useState } from "react";
import type {
  NotificationPreferences,
  PatientNotification,
} from "./PatientNotifications.types";

const initialNotifications: PatientNotification[] = [
  {
    id: 1,
    title: "Consulta confirmada",
    description:
      "Sua consulta com Dra. Amanda Foster foi confirmada para 23 de abril às 10:00.",
    date: "22 de abr. de 2024",
    time: "14:32",
    type: "appointment",
    read: false,
  },
  {
    id: 2,
    title: "Lembrete de consulta",
    description:
      "Você tem uma consulta amanhã, 23 de abril, às 10:00.",
    date: "22 de abr. de 2024",
    time: "09:00",
    type: "reminder",
    read: false,
  },
  {
    id: 3,
    title: "Consulta remarcada",
    description:
      "Sua consulta com Dr. Robert Chen foi remarcada para 28 de abril às 15:30.",
    date: "20 de abr. de 2024",
    time: "11:15",
    type: "appointment",
    read: true,
  },
];

const initialPreferences: NotificationPreferences = {
  email: true,
  reminders: true,
  appointmentUpdates: true,
};

export function usePatientNotifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications,
  );

  const [preferences, setPreferences] =
    useState<NotificationPreferences>(
      initialPreferences,
    );

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => !notification.read,
      ).length,
    [notifications],
  );

  function markAsRead(id: number) {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification,
      ),
    );
  }

  function markAllAsRead() {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  }

  function togglePreference(
    preference: keyof NotificationPreferences,
  ) {
    setPreferences((previous) => ({
      ...previous,
      [preference]: !previous[preference],
    }));
  }

  return {
    notifications,
    preferences,
    unreadCount,
    markAsRead,
    markAllAsRead,
    togglePreference,
  };
}
