export type ProfessionalNotification = {
  id: number;
  type: "appointment" | "reminder" | "system";
  title: string;
  description: string;
  read: boolean;
  date: string;
  time: string;
};