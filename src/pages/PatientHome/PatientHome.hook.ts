import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getMyAppointments } from "../../services/appointmentService";
import { mapAppointment } from "../PatientAppointments/PatientAppoiments.utils";
import { getSession } from "../../auth/session";
import type { PatientAppointment } from "../PatientAppointments/PatientAppointments.types";
import { getSpecialties } from "../../services/specialtyService";
import type { PatientSpecialty } from "./PatientHome.types";

export function usePatientHome() {
  const navigate = useNavigate();
  const firstName = getSession()?.name.split(" ")[0] ?? "";

  const [isSpecialtiesModalOpen, setIsSpecialtiesModalOpen] = useState(false);

  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [specialties, setSpecialties] = useState<PatientSpecialty[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<PatientAppointment | null>(null);
  function openAppointmentDetails(appointment: PatientAppointment) {
    setSelectedAppointment(appointment);
  }

  function closeAppointmentDetails() {
    setSelectedAppointment(null);
  }

  useEffect(() => {
    const controller = new AbortController();

    getSpecialties(controller.signal)
      .then((data) =>
        setSpecialties(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            description:
              item.description || "Especialidade disponível para agendamento.",
          })),
        ),
      )
      .catch(() => {
        /* o modal fica vazio */
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await getMyAppointments(controller.signal);
        setAppointments(data.map(mapAppointment));
      } catch (err) {
        if (axios.isCancel(err)) return;

        setError(
          axios.isAxiosError(err) && err.response?.status === 401
            ? "Sua sessão expirou. Faça login novamente."
            : "Não foi possível carregar seus agendamentos.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const { upcoming, completedCount } = useMemo(() => {
    const now = new Date();

    const upcoming = appointments
      .filter(
        (appointment) =>
          appointment.date >= now &&
          (appointment.status === "scheduled" ||
            appointment.status === "confirmed"),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    const completedCount = appointments.filter(
      (appointment) => appointment.status === "completed",
    ).length;

    return { upcoming, completedCount };
  }, [appointments]);

  function openSpecialtiesModal() {
    setIsSpecialtiesModalOpen(true);
  }

  function closeSpecialtiesModal() {
    setIsSpecialtiesModalOpen(false);
  }

  function handleSchedule(specialtyId: number) {
    setIsSpecialtiesModalOpen(false);
    navigate(`/book-appointment?specialtyId=${specialtyId}`);
  }

  return {
    isSpecialtiesModalOpen,
    openSpecialtiesModal,
    closeSpecialtiesModal,
    handleSchedule,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    nextAppointment: upcoming[0] ?? null,
    upcomingAppointments: upcoming.slice(0, 3),
    scheduledCount: upcoming.length,
    completedCount,
    firstName,
    specialties,
    selectedAppointment,
    openAppointmentDetails,
    closeAppointmentDetails,
  };
}
