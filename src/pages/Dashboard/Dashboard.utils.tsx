export const getFormattedDate = (): string => {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};