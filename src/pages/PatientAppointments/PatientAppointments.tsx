import AccessTime from "@mui/icons-material/AccessTime";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Search from "@mui/icons-material/Search";
import ViewList from "@mui/icons-material/ViewList";

import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./PatientAppointments.styled";
import { usePatientAppointments } from "./PatientAppointments.hook";
import {
  formatShortDate,
  getAppointmentCode,
  getInitials,
  getStatusLabel,
  getWeekdayLabel,
} from "./PatientAppoiments.utils";

const LIST_TITLES: Record<string, string> = {
  date: "Todos os agendamentos",
  today: "Agenda de hoje",
  week: "Agenda da semana",
};

const CALENDAR_HOURS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
];

export const PatientAppointments = () => {
  const {
    search,
    setSearch,
    status,
    setStatus,
    date,
    setDate,
    view,
    setView,
    loading,
    error,
    reload,
    filteredAppointments,
    weekDays,
    weekLabel,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
    getAppointmentsByDay,
    summary,
  } = usePatientAppointments();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.HeaderContainer>
          <Stack>
            <Typography
              variant="h4"
              sx={{
                color: "#102A56",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              Meus agendamentos
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "0.8rem" }}
            >
              Gerencie seus atendimentos agendados
            </Typography>
          </Stack>
        </Styled.HeaderContainer>

        <Styled.FiltersContainer>
          <Styled.SearchContainer>
            <Search
              sx={{
                fontSize: "1.1rem",
                color: "text.secondary",
              }}
            />

            <Styled.SearchInput
              placeholder="Pesquisar por profissional ou especialidade"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Styled.SearchContainer>

          <Styled.FilterSelect
            value={date}
            onChange={(event) => setDate(event.target.value)}
          >
            <option value="date">Data</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
          </Styled.FilterSelect>

          <Styled.FilterSelect
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="status">Status</option>
            <option value="scheduled">Agendado</option>
            <option value="confirmed">Confirmado</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
            <option value="noShow">Não compareceu</option>
          </Styled.FilterSelect>

          <Styled.ViewButtons>
            <Styled.ViewButton
              type="button"
              active={view === "list"}
              onClick={() => setView("list")}
            >
              <ViewList fontSize="small" />
              Lista
            </Styled.ViewButton>

            <Styled.ViewButton
              type="button"
              active={view === "calendar"}
              onClick={() => setView("calendar")}
            >
              <CalendarMonth fontSize="small" />
              Calendário
            </Styled.ViewButton>
          </Styled.ViewButtons>
        </Styled.FiltersContainer>

        <Styled.MainContent>
          <Styled.ScheduleCard>
            <Styled.ScheduleHeader>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                }}
              >
                {view === "list"
                  ? LIST_TITLES[date]
                  : "Calendário semanal"}
              </Typography>

              {view === "calendar" && (
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <IconButton size="small" onClick={goToPreviousWeek}>
                    <ChevronLeft fontSize="small" />
                  </IconButton>

                  <Button
                    size="small"
                    onClick={goToCurrentWeek}
                    sx={{ fontSize: "0.72rem", textTransform: "none" }}
                  >
                    {weekLabel}
                  </Button>

                  <IconButton size="small" onClick={goToNextWeek}>
                    <ChevronRight fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </Styled.ScheduleHeader>

            {loading ? (
              <Stack alignItems="center" sx={{ py: 6 }}>
                <CircularProgress size={28} />
              </Stack>
            ) : error ? (
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={reload}>
                    Tentar de novo
                  </Button>
                }
              >
                {error}
              </Alert>
            ) : view === "list" ? (
              <Styled.TableWrapper>
                <Table sx={{ minWidth: "720px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data e horário</TableCell>
                      <TableCell>Profissional</TableCell>
                      <TableCell>Especialidade</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredAppointments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: "0.75rem", py: 2 }}
                          >
                            Nenhum agendamento encontrado
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {filteredAppointments.map((appointment) => (
                      <Styled.StyledTableRow key={appointment.id} hover>
                        <TableCell>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ fontSize: "0.75rem" }}
                          >
                            {appointment.time}
                          </Typography>

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: "0.62rem" }}
                          >
                            {formatShortDate(appointment.date)}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Styled.PatientCell>
                            <Styled.Avatar>
                              {getInitials(appointment.professional)}
                            </Styled.Avatar>

                            <Stack>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                {appointment.professional}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.62rem" }}
                              >
                                {getAppointmentCode(appointment.id)}
                              </Typography>
                            </Stack>
                          </Styled.PatientCell>
                        </TableCell>

                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontSize: "0.72rem" }}
                          >
                            {appointment.specialty}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Styled.Status status={appointment.status}>
                            {getStatusLabel(appointment.status)}
                          </Styled.Status>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="small">
                            <MoreHoriz fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </Styled.StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Styled.TableWrapper>
            ) : (
              <Styled.CalendarWrapper>
                <Styled.CalendarGrid>
                  <Styled.CalendarTimeColumn>
                    {CALENDAR_HOURS.map((time) => (
                      <Styled.CalendarTime key={time}>
                        {time}
                      </Styled.CalendarTime>
                    ))}
                  </Styled.CalendarTimeColumn>

                  {weekDays.map((day) => {
                    const dayAppointments = getAppointmentsByDay(day);

                    return (
                      <Styled.CalendarDayColumn key={day.toISOString()}>
                        <Styled.CalendarDayHeader>
                          <Styled.CalendarDayName>
                            {getWeekdayLabel(day)}
                          </Styled.CalendarDayName>

                          <Styled.CalendarDayDate>
                            {formatShortDate(day)}
                          </Styled.CalendarDayDate>
                        </Styled.CalendarDayHeader>

                        <Styled.CalendarAppointments>
                          {dayAppointments.length === 0 && (
                            <Styled.CalendarEmpty>
                              Nenhum agendamento
                            </Styled.CalendarEmpty>
                          )}

                          {dayAppointments.map((appointment) => (
                            <Styled.CalendarAppointment key={appointment.id}>
                              <Styled.CalendarAppointmentTime>
                                {appointment.time}
                              </Styled.CalendarAppointmentTime>

                              <Styled.CalendarAppointmentPatient>
                                {appointment.professional}
                              </Styled.CalendarAppointmentPatient>

                              <Styled.CalendarAppointmentSpecialty>
                                {appointment.specialty}
                              </Styled.CalendarAppointmentSpecialty>

                              <Styled.Status status={appointment.status}>
                                {getStatusLabel(appointment.status)}
                              </Styled.Status>
                            </Styled.CalendarAppointment>
                          ))}
                        </Styled.CalendarAppointments>
                      </Styled.CalendarDayColumn>
                    );
                  })}
                </Styled.CalendarGrid>
              </Styled.CalendarWrapper>
            )}
          </Styled.ScheduleCard>

          <Styled.SummaryColumn>
            <Styled.SummaryCard>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                }}
              >
                Resumo
              </Typography>

              <Styled.SummaryItem sx={{ backgroundColor: "#F1F7FF" }}>
                <CalendarToday color="primary" />
                <Styled.SummaryNumber>{summary.total}</Styled.SummaryNumber>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  agendamentos
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#E9FAF1" }}>
                <CheckCircle sx={{ color: "#219653" }} />
                <Styled.SummaryNumber>
                  {summary.confirmed}
                </Styled.SummaryNumber>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  confirmados
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#FFF8E8" }}>
                <AccessTime sx={{ color: "#D99400" }} />
                <Styled.SummaryNumber>{summary.pending}</Styled.SummaryNumber>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  pendentes
                </Typography>
              </Styled.SummaryItem>
            </Styled.SummaryCard>
          </Styled.SummaryColumn>
        </Styled.MainContent>
      </Styled.Container>
    </Stack>
  );
};