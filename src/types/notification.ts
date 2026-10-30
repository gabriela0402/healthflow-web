export type NotificationResponse = {
  id: number;
  type: "appointment" | "reminder" | "system";
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationPreferencesPayload = {
  email: boolean;
  reminders: boolean;
  appointmentUpdates: boolean;
};