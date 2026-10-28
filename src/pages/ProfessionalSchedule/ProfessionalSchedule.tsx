import AccessTime from "@mui/icons-material/AccessTime";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { AvailabilityModal } from "../../components/AvailabilityModal/AvailabilityModal";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./ProfessionalSchedule.styled";
import {
  getInitials,
  getStatusLabel,
  useProfessionalSchedule,
} from "./ProfessionalSchedule.hook";
import { SLOT_HEIGHT } from "./ProfessionalSchedule.utils";

export const ProfessionalSchedule = () => {
  const {
    weekDays, weekLabel, hours,
    selectedDate, setSelectedDate,
    loading, error, reload,
    getAppointmentsByDay, getAppointmentTop,
    handlePreviousWeek, handleNextWeek, handleToday,
    daySummary, upcoming, availabilityList,
    isAvailabilityModalOpen, availabilityForm,
    openAvailabilityModal, closeAvailabilityModal,
    handleAvailabilityChange, saveAvailability,
  } = useProfessionalSchedule();

  const navigate = useNavigate();
  const show = (value: number) => (loading ? "..." : value);

  return (
    <Stack>
      <SideBar />

      <Styled.Container>
        <Styled.Header>
          <Stack>
            <Typography variant="h4" sx={{ color: "#102A56", fontSize: "1.2rem", fontWeight: 700 }}>
              Minha agenda
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              Acompanhe seus atendimentos e horários
            </Typography>
          </Stack>

          <Styled.HeaderActions>
            <ButtonBlue text="+ Nova disponibilidade" onClick={openAvailabilityModal} />
          </Styled.HeaderActions>
        </Styled.Header>

        <Stack direction="row" alignItems="center" gap={1} sx={{ marginTop: "1.5rem" }}>
          <Styled.WeekSelector>
            <IconButton size="small" onClick={handlePreviousWeek}>
              <ArrowBackIosNew fontSize="small" />
            </IconButton>

            <CalendarToday sx={{ color: "primary.main", fontSize: "1.1rem" }} />

            <Typography variant="body2" fontWeight={600} sx={{ whiteSpace: "nowrap" }}>
              {weekLabel}
            </Typography>

            <IconButton size="small" onClick={handleNextWeek}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Styled.WeekSelector>

          <Button onClick={handleToday} sx={{ textTransform: "none" }}>
            Hoje
          </Button>
        </Stack>

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
            action={<Button color="inherit" size="small" onClick={reload}>Tentar de novo</Button>}
          >
            {error}
          </Alert>
        )}

        <Styled.MainContent>
          <Styled.CalendarCard>
            {loading ? (
              <Stack alignItems="center" sx={{ py: 8 }}>
                <CircularProgress size={28} />
              </Stack>
            ) : (
              <Styled.CalendarScroll>
                <Styled.CalendarGrid>
                  <Styled.TimeColumn>
                    {hours.map((time) => (
                      <Styled.TimeLabel key={time}>{time}</Styled.TimeLabel>
                    ))}
                  </Styled.TimeColumn>

                  {weekDays.map((day) => {
                    const dayAppointments = getAppointmentsByDay(day.fullDate);
                    const isActive = selectedDate === day.fullDate;

                    return (
                      <Styled.DayColumn key={day.fullDate} active={isActive}>
                        <Styled.DayHeader
                          active={isActive}
                          onClick={() => setSelectedDate(day.fullDate)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Styled.DayName>{day.shortName}</Styled.DayName>
                          <Styled.DayDate>{day.date}</Styled.DayDate>
                        </Styled.DayHeader>

                        <Styled.DayAppointments sx={{ minHeight: `${hours.length * SLOT_HEIGHT}px` }}>
                          {dayAppointments.length === 0 && (
                            <Styled.EmptyDay>Sem atendimentos</Styled.EmptyDay>
                          )}

                          {dayAppointments.map((appointment) => (
                            <Styled.AppointmentCard
                              key={appointment.id}
                              sx={{ top: `${getAppointmentTop(appointment.date)}px` }}
                            >
                              <Styled.AppointmentTop>
                                <Styled.Avatar>{getInitials(appointment.patient)}</Styled.Avatar>

                                <Stack minWidth={0}>
                                  <Styled.AppointmentTime>{appointment.time}</Styled.AppointmentTime>
                                  <Styled.PatientName>{appointment.patient}</Styled.PatientName>
                                </Stack>
                              </Styled.AppointmentTop>

                              <Styled.Specialty>{appointment.code}</Styled.Specialty>

                              <Styled.Status status={appointment.status}>
                                {getStatusLabel(appointment.status)}
                              </Styled.Status>
                            </Styled.AppointmentCard>
                          ))}
                        </Styled.DayAppointments>
                      </Styled.DayColumn>
                    );
                  })}
                </Styled.CalendarGrid>
              </Styled.CalendarScroll>
            )}
          </Styled.CalendarCard>

          <Styled.SummaryColumn>
            <Styled.SummaryCard>
              <Styled.SummaryHeader>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
                  Resumo do dia
                </Typography>
              </Styled.SummaryHeader>

              <Styled.SummaryItem sx={{ backgroundColor: "#F1F7FF" }}>
                <CalendarToday color="primary" />
                <Styled.SummaryNumber>{show(daySummary.total)}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary">atendimentos</Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#E9FAF1" }}>
                <CheckCircle sx={{ color: "#219653" }} />
                <Styled.SummaryNumber>{show(daySummary.confirmed)}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary">confirmados</Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#FFF8E8" }}>
                <AccessTime sx={{ color: "#D99400" }} />
                <Styled.SummaryNumber>{show(daySummary.pending)}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary">pendentes</Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#F0F3F8" }}>
                <CheckCircle sx={{ color: "#667085" }} />
                <Styled.SummaryNumber>{show(daySummary.completed)}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary">concluídos</Typography>
              </Styled.SummaryItem>
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Styled.SummaryHeader>
                <Typography variant="h6" fontWeight={700}>Próximos atendimentos</Typography>
                <Styled.SeeAllButton onClick={() => navigate("/my-appointments")}>
                  Ver Tudo
                </Styled.SeeAllButton>
              </Styled.SummaryHeader>

              {!loading && upcoming.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Nenhum atendimento futuro.
                </Typography>
              )}

              {upcoming.map((appointment) => (
                <Styled.UpcomingItem key={appointment.id}>
                  <Styled.UpcomingTime>{appointment.time}</Styled.UpcomingTime>

                  <Stack flex={1} minWidth={0}>
                    <Typography variant="body2" fontWeight={600} noWrap>
                      {appointment.patient}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {appointment.date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                    </Typography>
                  </Stack>

                  <Styled.UpcomingStatus
                    status={appointment.status === "confirmed" ? "confirmed" : "pending"}
                  >
                    {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                  </Styled.UpcomingStatus>
                </Styled.UpcomingItem>
              ))}
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
                Meus horários
              </Typography>

              {!loading && availabilityList.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Nenhum horário cadastrado. Use "+ Nova disponibilidade".
                </Typography>
              )}

              {availabilityList.map((item) => (
                <Typography key={item.id} variant="body2">
                  {item.label}
                </Typography>
              ))}
            </Styled.SummaryCard>
          </Styled.SummaryColumn>
        </Styled.MainContent>
      </Styled.Container>

      <AvailabilityModal
        open={isAvailabilityModalOpen}
        form={availabilityForm}
        onClose={closeAvailabilityModal}
        onChange={handleAvailabilityChange}
        onSave={saveAvailability}
      />
    </Stack>
  );
};