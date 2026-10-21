import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Não foi possível conectar ao servidor.";
    }

    const data = error.response.data;

    if (typeof data === "string" && data) return data;
    if (data?.message) return data.message;
    if (data?.detail) return data.detail;
  }

  return fallback;
}