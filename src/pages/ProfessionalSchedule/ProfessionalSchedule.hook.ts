import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { getApiErrorMessage } from "../../services/apiError";
import { getMySchedule } from "../../services/appointmentService";
import {
  createMyAvailability,
  getMyAvailability,
} from "../../services/professionalService";
import type { AvailabilityForm } from "../../components/AvailabilityModal/AvailabilityModal.types";
import type { ProfessionalAvailability } from "../PatientBooking/PatientBooking.types";
import {
  addDays,
  formatShortDate,
  getWeekdayLabel,
  getWeekStart,
} from "../ProfessioanlAppointments/ProfessionalAppointments.utils";


import type { ScheduleAppointment, ScheduleDay } from "./ProfessionalSchedule.types";
import {
  DEFAULT_SLOT_MINUTES,
  formatAvailability,
  formatHour,
  getAppointmentTop,
  mapScheduleAppointment,
  toDateKey,
  toDayIndex,
  toMinutes,
} from "./ProfessionalSchedule.utils";

export { getInitials, getStatusLabel } from "../ProfessioanlAppointments/ProfessionalAppointments.utils";

const emptyForm: AvailabilityForm = { day: "", startTime: "", endTime: "" };

export function useProfessionalSchedule() {
  const [appointments, setAppointments] = useState<ScheduleAppointment[]>([]);
  const [availabilities, setAvailabilities] = useState<ProfessionalAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(toDateKey(new Date()));

  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [availabilityForm, setAvailabilityForm] = useState<AvailabilityForm>(emptyForm);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [schedule, availability] = await Promise.all([
          getMySchedule(controller.signal),
          getMyAvailability(controller.signal),
        ]);

        setAppointments(schedule.map(mapScheduleAppointment));
        setAvailabilities(availability);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(getApiErrorMessage(err, "Não foi possível carregar a agenda."));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [reloadKey]);

  const weekDays = useMemo<ScheduleDay[]>(() => {
    const start = addDays(getWeekStart(new Date()), weekOffset * 7);

    return Array.from({ length: 5 }, (_, index) => {
      const date = addDays(start, index);
      return {
        shortName: getWeekdayLabel(date),
        date: formatShortDate(date),
        fullDate: toDateKey(date),
      };
    });
  }, [weekOffset]);

  const weekLabel = `${weekDays[0].date} – ${weekDays[4].date}`;

  const visible = useMemo(() => {
    const keys = new Set(weekDays.map((day) => day.fullDate));
    return appointments.filter(
      (a) => a.status !== "cancelled" && keys.has(a.dateKey),
    );
  }, [appointments, weekDays]);

  const { startHour, hours } = useMemo(() => {
    const used = visible.map((a) => a.date.getHours());
    const start = Math.min(8, ...used);
    const end = Math.max(17, ...used.map((h) => h + 1));

    return {
      startHour: start,
      hours: Array.from({ length: end - start }, (_, i) => formatHour(start + i)),
    };
  }, [visible]);

  function changeWeek(offset: number) {
    setWeekOffset(offset);

    const start = addDays(getWeekStart(new Date()), offset * 7);
    const today = toDateKey(new Date());
    const keys = Array.from({ length: 5 }, (_, i) => toDateKey(addDays(start, i)));

    setSelectedDate(keys.includes(today) ? today : keys[0]);
  }

  function getAppointmentsByDay(dateKey: string) {
    return visible.filter((a) => a.dateKey === dateKey);
  }

  function getTop(date: Date) {
    return getAppointmentTop(date, startHour);
  }

  const daySummary = useMemo(() => {
    const day = appointments.filter(
      (a) => a.dateKey === selectedDate && a.status !== "cancelled",
    );

    return {
      total: day.length,
      confirmed: day.filter((a) => a.status === "confirmed").length,
      pending: day.filter((a) => a.status === "scheduled").length,
      completed: day.filter((a) => a.status === "completed").length,
    };
  }, [appointments, selectedDate]);

  const upcoming = useMemo(() => {
    const now = new Date();

    return appointments
      .filter(
        (a) =>
          a.date >= now &&
          (a.status === "scheduled" || a.status === "confirmed"),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 4);
  }, [appointments]);

  const availabilityList = useMemo(
    () =>
      availabilities
        .map(formatAvailability)
        .sort((a, b) => a.index - b.index),
    [availabilities],
  );

  function openAvailabilityModal() {
    setIsAvailabilityModalOpen(true);
  }

  function closeAvailabilityModal() {
    setIsAvailabilityModalOpen(false);
    setAvailabilityForm(emptyForm);
  }

  function handleAvailabilityChange(field: keyof AvailabilityForm, value: string) {
    setAvailabilityForm((previous) => ({ ...previous, [field]: value }));
  }

  async function saveAvailability() {
    const dayOfWeek = toDayIndex(availabilityForm.day);
    const { startTime, endTime } = availabilityForm;

    if (dayOfWeek === null || !startTime || !endTime) {
      toast.error("Informe o dia, o horário inicial e o final.");
      return;
    }

    const total = toMinutes(endTime) - toMinutes(startTime);

    if (total <= 0) {
      toast.error("O horário final deve ser depois do inicial.");
      return;
    }

    if (total % DEFAULT_SLOT_MINUTES !== 0) {
      toast.error(`O intervalo deve ser múltiplo de ${DEFAULT_SLOT_MINUTES} minutos.`);
      return;
    }

    try {
      setIsSaving(true);

      await createMyAvailability({
        dayOfWeek,
        startTime: `${startTime.slice(0, 5)}:00`,
        endTime: `${endTime.slice(0, 5)}:00`,
        slotDurationInMinutes: DEFAULT_SLOT_MINUTES,
      });

      toast.success("Disponibilidade cadastrada com sucesso!");
      closeAvailabilityModal();
      setReloadKey((key) => key + 1);
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Não foi possível salvar a disponibilidade."));
    } finally {
      setIsSaving(false);
    }
  }

  return {
    weekDays,
    weekLabel,
    hours,
    selectedDate,
    setSelectedDate,
    loading,
    error,
    reload: () => setReloadKey((key) => key + 1),
    getAppointmentsByDay,
    getAppointmentTop: getTop,
    handlePreviousWeek: () => changeWeek(weekOffset - 1),
    handleNextWeek: () => changeWeek(weekOffset + 1),
    handleToday: () => changeWeek(0),
    daySummary,
    upcoming,
    availabilityList,
    isAvailabilityModalOpen,
    availabilityForm,
    openAvailabilityModal,
    closeAvailabilityModal,
    handleAvailabilityChange,
    saveAvailability,
    isSaving,
  };
}