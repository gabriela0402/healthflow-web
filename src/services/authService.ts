import { api } from "./api";
import { clearSession } from "../auth/session";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

export async function login(payload: LoginRequest) {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function register(payload: RegisterRequest) {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export function logout() {
  clearSession();
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  await api.put("/auth/change-password", payload);
}