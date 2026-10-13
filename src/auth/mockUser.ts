export type UserRole =
  | "admin"
  | "professional"
  | "patient";

export const mockUser = {
  name: "Gabriela",
  role: "patient" as UserRole,
};
