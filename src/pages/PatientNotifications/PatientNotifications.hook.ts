import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import {
  getMyNotifications,
  getNotificationPreferences,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  updateNotificationPreferences,
} from "../../services/notificationService";
import type { NotificationPreferences, PatientNotification } from "./PatientNotifications.types";
import { mapNotification } from "./PatientNotifications.utils";

const defaultPreferences: NotificationPreferences = {
  email: true,
  reminders: true,
  appointmentUpdates: true,
};

export function usePatientNotifications() {
  const [notifications, setNotifications] = useState<PatientNotification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [list, prefs] = await Promise.all([
          getMyNotifications(controller.signal),
          getNotificationPreferences(controller.signal),
        ]);

        setNotifications(list.map(mapNotification));
        setPreferences(prefs);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getApiErrorMessage(err, "Não foi possível carregar as notificações."));
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
    const previous = notifications;

    setNotifications((list) =>
      list.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );

    try {
      await markNotificationAsRead(id);
    } catch (err) {
      setNotifications(previous);
      toast.error(getApiErrorMessage(err, "Não foi possível marcar como lida."));
    }
  }

  async function markAllAsRead() {
    const previous = notifications;

    setNotifications((list) => list.map((item) => ({ ...item, read: true })));

    try {
      await markAllNotificationsAsRead();
    } catch (err) {
      setNotifications(previous);
      toast.error(getApiErrorMessage(err, "Não foi possível marcar todas como lidas."));
    }
  }

  async function togglePreference(preference: keyof NotificationPreferences) {
    const previous = preferences;
    const next = { ...preferences, [preference]: !preferences[preference] };

    setPreferences(next);

    try {
      await updateNotificationPreferences(next);
    } catch (err) {
      setPreferences(previous);
      toast.error(getApiErrorMessage(err, "Não foi possível salvar a preferência."));
    }
  }

  return {
    notifications,
    preferences,
    unreadCount,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    markAsRead,
    markAllAsRead,
    togglePreference,
  };
}