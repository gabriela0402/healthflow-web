export function getHomeRoute(role?: string | null) {
  const normalizedRole = role?.toLowerCase();

  if (normalizedRole === "patient" || normalizedRole === "paciente") {
    return "/home";
  }

  if (normalizedRole === "professional" || normalizedRole === "profissional") {
    return "/professional-dashboard";
  }

  return "/dashboard";
}