import { Navigate, Route, Routes } from "react-router-dom";
import { Appointments } from "../pages/Appointments/Appointments";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Login/Login";
import { Patients } from "../pages/Patients/Patients";
import { Professionals } from "../pages/Professionals/Professionals";
import { Specialties } from "../pages/Specialties/Specialties";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route
          path="/professionals"
          element={<Professionals />}
        />
        <Route
          path="/specialties"
          element={<Specialties />}
        />
        <Route
          path="/appointments"
          element={<Appointments />}
        />
      </Route>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}
