export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  userId: number;
  patientId: number | null;
  name: string;
  email: string;
  role: string;
  token: string;
};