export function getHomeRoute(role?: string | null) {
  switch (role?.toLowerCase()) {
    case "patient":
    case "paciente":
      return "/home";
    case "professional":
    case "profissional":
      return "/dashboard-professional";
    case "admin":
      return "/dashboard";
    default:
      return "/login";
  }
}