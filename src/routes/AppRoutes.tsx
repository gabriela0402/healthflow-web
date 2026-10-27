import { Navigate, Route, Routes } from "react-router-dom";
import { Appointments } from "../pages/Appointments/Appointments";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Login } from "../pages/Login/Login";
import { Patients } from "../pages/Patients/Patients";
import { Professionals } from "../pages/Professionals/Professionals";
import { Specialties } from "../pages/Specialties/Specialties";
import { Register } from "../pages/Register/Register";
import { Settings } from "../pages/Settings/Settings";
import { ProfessionalDashboard } from "../pages/ProfessionalDashboard/ProfessionalDashboard";
import { ProfessionalSchedule } from "../pages/ProfessionalSchedule/ProfessionalSchedule";
import { ProfessionalPatients } from "../pages/ProfessionalPatients/ProfessionalPatients";
import { ProfessioanlAppointments } from "../pages/ProfessioanlAppointments/ProfessioanlAppointments";
import { ProfessionalProfile } from "../pages/ProfessionalProfile/ProfessionalProfile";
import { PatientHome } from "../pages/PatientHome/PatientHome";
import { PatientBooking } from "../pages/PatientBooking/PatientBooking";
import { PatientData } from "../pages/PatientData/PatientData";
import { PatientNotifications } from "../pages/PatientNotifications/PatientNotifications";
import { PatientCreate } from "../pages/PatientCreate/PatientCreate";
import { ProfessionalCreate } from "../pages/ProfessionalCreate/ProfessionalCreate";
import { SpecialtyCreate } from "../pages/SpecialtyCreate/SpecialtyCreate";
import { AppointmentCreate } from "../pages/AppointmentCreate/AppointmentCreate";
import { PatientAppointments } from "../pages/PatientAppointments/PatientAppointments";
import { PrivateRoute } from "./PrivateRoute";
import { getHomeRoute } from "../auth/getHomeRoute";
import { getSession } from "../auth/session";

export function AppRoutes() {
  const homeRoute = getHomeRoute(getSession()?.role);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/new" element={<PatientCreate />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/professionals/new" element={<ProfessionalCreate />} />
        <Route path="/professionals/:id/edit" element={<ProfessionalCreate />} />
        <Route path="/specialties" element={<Specialties />} />
        <Route path="/specialties/new" element={<SpecialtyCreate />} />
        <Route path="/specialties/:id/edit" element={<SpecialtyCreate />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/new" element={<AppointmentCreate />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["Professional"]} />}>
        <Route path="/dashboard-professional" element={<ProfessionalDashboard />} />
        <Route path="/my-schedule" element={<ProfessionalSchedule />} />
        <Route path="/my-patients" element={<ProfessionalPatients />} />
        <Route path="/my-appointments" element={<ProfessioanlAppointments />} />
        <Route path="/profile" element={<ProfessionalProfile />} />
      </Route>

      <Route element={<PrivateRoute allowedRoles={["Patient"]} />}>
        <Route path="/home" element={<PatientHome />} />
        <Route path="/book-appointment" element={<PatientBooking />} />
        <Route path="/my-data" element={<PatientData />} />
        <Route path="/notifications" element={<PatientNotifications />} />
        <Route path="/my-appoiments-patient" element={<PatientAppointments />} />
      </Route>

      <Route path="/" element={<Navigate to={homeRoute} replace />} />
      <Route path="*" element={<Navigate to={homeRoute} replace />} />
    </Routes>
  );
}