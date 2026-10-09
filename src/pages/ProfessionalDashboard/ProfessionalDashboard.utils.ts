export const getFormattedDate = (): string => {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const appointmentData = [
  { month: "Dom", appointments: 320 },
  { month: "Seg", appointments: 410 },
  { month: "Ter", appointments: 380 },
  { month: "Qua", appointments: 520 },
  { month: "Qui", appointments: 460 },
  { month: "Sex", appointments: 610 },
  { month: "Sab", appointments: 540 },
];