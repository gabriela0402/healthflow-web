export type NotificationType =
  | "appointment"
  | "reminder"
  | "system";

export type PatientNotification = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: NotificationType;
  read: boolean;
};

export type NotificationPreferences = {
  email: boolean;
  reminders: boolean;
  appointmentUpdates: boolean;
};
