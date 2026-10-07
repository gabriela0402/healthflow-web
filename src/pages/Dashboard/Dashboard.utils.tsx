export const getFormattedDate = (): string => {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const appointmentData = [
  { month: "Jan", appointments: 320 },
  { month: "Fev", appointments: 410 },
  { month: "Mar", appointments: 380 },
  { month: "Abr", appointments: 520 },
  { month: "Mai", appointments: 460 },
  { month: "Jun", appointments: 610 },
  { month: "Jul", appointments: 540 },
];
