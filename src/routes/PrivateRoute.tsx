import { Navigate, Outlet } from "react-router-dom";

import { getHomeRoute } from "../auth/getHomeRoute";
import { getSession } from "../auth/session";

type PrivateRouteProps = {
  allowedRoles: string[];
};

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const role = (session.role ?? "").toLowerCase();

  if (!allowedRoles.some((item) => item.toLowerCase() === role)) {
    return <Navigate to={getHomeRoute(session.role)} replace />;
  }

  return <Outlet />;
}