import type { AuthResponse } from "../types/auth";

const KEYS = {
  token: "token",
  role: "role",
  userId: "userId",
  patientId: "patientId",
  userName: "userName",
} as const;

export type Session = {
  token: string;
  role: string | null;
  userId: number | null;
  patientId: number | null;
  name: string;
};

export function saveSession(data: AuthResponse) {
  localStorage.setItem(KEYS.token, data.token);
  localStorage.setItem(KEYS.role, data.role ?? "");
  localStorage.setItem(KEYS.userId, String(data.userId));
  localStorage.setItem(KEYS.userName, data.name ?? "");

  if (data.patientId != null) {
    localStorage.setItem(KEYS.patientId, String(data.patientId));
  } else {
    localStorage.removeItem(KEYS.patientId);
  }
}

export function getToken() {
  return localStorage.getItem(KEYS.token);
}

export function getSession(): Session | null {
  const token = getToken();

  if (!token) return null;

  const userId = localStorage.getItem(KEYS.userId);
  const patientId = localStorage.getItem(KEYS.patientId);

  return {
    token,
    role: localStorage.getItem(KEYS.role) || null,
    userId: userId ? Number(userId) : null,
    patientId: patientId ? Number(patientId) : null,
    name: localStorage.getItem(KEYS.userName) ?? "",
  };
}

export function clearSession() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}