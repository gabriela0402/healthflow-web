export type UserRole =
  | "admin"
  | "professional"
  | "patient";

export const mockUser = {
  name: "Gabriela",
  role: "admin" as UserRole,
};
