import AccessTime from "@mui/icons-material/AccessTime";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import EventAvailable from "@mui/icons-material/EventAvailable";
import { IconButton, Stack, Typography } from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./ProfessionalSchedule.styled";
import { useProfessionalSchedule } from "./ProfessionalSchedule.hook";
import { ButtonBlue, ButtonWhite } from "../../components/Buttons/Buttons";

export const ProfessionalSchedule = () => {
  const {
    weekDays,
    selectedDate,
    selectedDay,
    setSelectedDate,
    getAppointmentsByDay,
    getStatusLabel,
    getInitials,
    getAppointmentTop,
    handlePreviousWeek,
    handleNextWeek,
    handleToday,
  } = useProfessionalSchedule();

  return (
    <>
      <SideBar />

      <Styled.Container>
        <Styled.Header>
          <Stack>
            <Typography
              variant="h4"
              sx={{
                color: "#102A56",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              Minha agenda
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "0.8rem" }}
            >
              Acompanhe seus atendimentos e horários
            </Typography>
          </Stack>

          <Styled.HeaderActions>
            <ButtonWhite text="Hoje" />
            <ButtonBlue text="+ Nova disponibilidade" />
          </Styled.HeaderActions>
        </Styled.Header>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            marginTop: "1.5rem",
          }}
        >
          <Styled.WeekSelector>
            <IconButton size="small" onClick={handlePreviousWeek}>
              <ArrowBackIosNew fontSize="small" />
            </IconButton>

            <CalendarToday
              sx={{
                color: "primary.main",
                fontSize: "1.1rem",
              }}
            />

            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ whiteSpace: "nowrap" }}
            >
              18 – 22 de março de 2024
            </Typography>

            <IconButton size="small" onClick={handleNextWeek}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Styled.WeekSelector>
        </Stack>

        <Styled.MainContent>
          <Styled.CalendarCard>
            <Styled.CalendarScroll>
              <Styled.CalendarGrid>
                <Styled.TimeColumn>
                  {[
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                  ].map((time) => (
                    <Styled.TimeLabel key={time}>{time}</Styled.TimeLabel>
                  ))}
                </Styled.TimeColumn>

                {weekDays.map((day) => {
                  const dayAppointments = getAppointmentsByDay(day.shortName);

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

                      <Styled.DayAppointments>
                        {dayAppointments.length === 0 && (
                          <Styled.EmptyDay>Sem atendimentos</Styled.EmptyDay>
                        )}

                        {dayAppointments.map((appointment) => (
                          <Styled.AppointmentCard
                            key={appointment.id}
                            sx={{
                              top: `${getAppointmentTop(appointment.time)}px`,
                            }}
                          >
                            <Styled.AppointmentTop>
                              <Styled.Avatar>
                                {getInitials(appointment.patient)}
                              </Styled.Avatar>

                              <Stack minWidth={0}>
                                <Styled.AppointmentTime>
                                  {appointment.time}
                                </Styled.AppointmentTime>

                                <Styled.PatientName>
                                  {appointment.patient}
                                </Styled.PatientName>
                              </Stack>
                            </Styled.AppointmentTop>

                            <Styled.Specialty>
                              {appointment.specialty}
                            </Styled.Specialty>

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
          </Styled.CalendarCard>

          <Styled.SummaryColumn>
            <Styled.SummaryCard>
              <Styled.SummaryHeader>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ fontSize: "1rem" }}
                >
                  Resumo do dia
                </Typography>
              </Styled.SummaryHeader>

              <Styled.SummaryItem sx={{ backgroundColor: "#F1F7FF" }}>
                <CalendarToday color="primary" />

                <Styled.SummaryNumber>8</Styled.SummaryNumber>

                <Typography variant="body2" color="text.secondary">
                  atendimentos
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#E9FAF1" }}>
                <CheckCircle sx={{ color: "#219653" }} />

                <Styled.SummaryNumber>5</Styled.SummaryNumber>

                <Typography variant="body2" color="text.secondary">
                  confirmados
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#FFF8E8" }}>
                <AccessTime sx={{ color: "#D99400" }} />

                <Styled.SummaryNumber>2</Styled.SummaryNumber>

                <Typography variant="body2" color="text.secondary">
                  pendentes
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#F0F3F8" }}>
                <CheckCircle sx={{ color: "#667085" }} />

                <Styled.SummaryNumber>1</Styled.SummaryNumber>

                <Typography variant="body2" color="text.secondary">
                  concluído
                </Typography>
              </Styled.SummaryItem>
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Styled.SummaryHeader>
                <Typography variant="h6" fontWeight={700}>
                  Próximos atendimentos
                </Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Ver todos
                </Typography>
              </Styled.SummaryHeader>

              <Styled.UpcomingItem>
                <Styled.UpcomingTime>09:30</Styled.UpcomingTime>

                <Stack flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    Fernanda Costa
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Cardiologia
                  </Typography>
                </Stack>

                <Styled.UpcomingStatus status="pending">
                  Pendente
                </Styled.UpcomingStatus>
              </Styled.UpcomingItem>

              <Styled.UpcomingItem>
                <Styled.UpcomingTime>11:00</Styled.UpcomingTime>

                <Stack flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    Ricardo Santos
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Cardiologia
                  </Typography>
                </Stack>

                <Styled.UpcomingStatus status="confirmed">
                  Confirmado
                </Styled.UpcomingStatus>
              </Styled.UpcomingItem>

              <Styled.UpcomingItem>
                <Styled.UpcomingTime>14:00</Styled.UpcomingTime>

                <Stack flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    Patrícia Lima
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Cardiologia
                  </Typography>
                </Stack>

                <Styled.UpcomingStatus status="pending">
                  Pendente
                </Styled.UpcomingStatus>
              </Styled.UpcomingItem>

              <Styled.UpcomingItem>
                <Styled.UpcomingTime>16:00</Styled.UpcomingTime>

                <Stack flex={1} minWidth={0}>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    Bruno Oliveira
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Cardiologia
                  </Typography>
                </Stack>

                <Styled.UpcomingStatus status="confirmed">
                  Confirmado
                </Styled.UpcomingStatus>
              </Styled.UpcomingItem>
            </Styled.SummaryCard>
          </Styled.SummaryColumn>
        </Styled.MainContent>
      </Styled.Container>
    </>
  );
};
