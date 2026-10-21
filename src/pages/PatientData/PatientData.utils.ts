import type {
  PatientProfileResponse,
  UpdatePatientProfilePayload,
} from "../../types/patient";
import type { PatientDataForm } from "./PatientData.types";

export const emptyForm: PatientDataForm = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  cpf: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
};

export function formatCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function toForm(data: PatientProfileResponse): PatientDataForm {
  return {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? "",
    birthDate: data.dateOfBirth?.slice(0, 10) ?? "",
    gender: data.gender ?? "",
    cpf: data.cpf ? formatCpf(data.cpf) : "",
    address: data.address ?? "",
    emergencyContactName: data.emergencyContactName ?? "",
    emergencyContactPhone: data.emergencyContactPhone ?? "",
  };
}

export function toPayload(form: PatientDataForm): UpdatePatientProfilePayload {
  return {
    fullName: form.fullName.trim(),
    phone: form.phone.trim() || null,
    dateOfBirth: form.birthDate || null,
    gender: form.gender || null,
    cpf: form.cpf.trim() || null,
    address: form.address.trim() || null,
    emergencyContactName: form.emergencyContactName.trim() || null,
    emergencyContactPhone: form.emergencyContactPhone.trim() || null,
  };
}

export function getInitials(name: string) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}