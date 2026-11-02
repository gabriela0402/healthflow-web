import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  getMyProfessionalNotifications,
  markAllProfessionalNotificationsAsRead,
  markProfessionalNotificationAsRead,
} from "../../services/notificationService";
import type { NotificationResponse } from "../../types/notification";
import type { ProfessionalNotification } from "./ProfessionalNotifications.types";

function mapNotification(item: NotificationResponse): ProfessionalNotification {
  const createdAt = new Date(item.createdAt);

  return {
    id: item.id,
    type: item.type as ProfessionalNotification["type"],
    title: item.title,
    description: item.description,
    read: item.isRead,
    date: createdAt.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: createdAt.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}

export function useProfessionalNotifications() {
  const [notifications, setNotifications] = useState<ProfessionalNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyProfessionalNotifications(controller.signal);
        setNotifications(data.map(mapNotification));
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          getApiErrorMessage(err, "Não foi possível carregar as notificações."),
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  async function markAsRead(id: number) {
    try {
      await markProfessionalNotificationAsRead(id);

      setNotifications((previous) =>
        previous.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification,
        ),
      );
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível marcar como lida."),
      );
    }
  }

  async function markAllAsRead() {
    try {
      await markAllProfessionalNotificationsAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({ ...notification, read: true })),
      );
    } catch (err) {
      toast.error(
        getApiErrorMessage(err, "Não foi possível marcar todas como lidas."),
      );
    }
  }

  return {
    notifications,
    unreadCount,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    markAsRead,
    markAllAsRead,
  };
}