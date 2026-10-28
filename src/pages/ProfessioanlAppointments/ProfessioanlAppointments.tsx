import AccessTime from "@mui/icons-material/AccessTime";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CalendarToday from "@mui/icons-material/CalendarToday";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import EventNote from "@mui/icons-material/EventNote";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Search from "@mui/icons-material/Search";
import ViewList from "@mui/icons-material/ViewList";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./ProfessioanlAppointments.styled";
import { useProfessionalAppointments } from "./ProfessionalAppointments.hooks";
import {
  formatShortDate,
  getInitials,
  getStatusLabel,
  getWeekdayLabel,
} from "./ProfessionalAppointments.utils";

const LIST_TITLES: Record<string, string> = {
  all: "Todos os agendamentos",
  today: "Agenda de hoje",
  week: "Agenda da semana",
};

const CALENDAR_HOURS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
];

export const ProfessioanlAppointments = () => {
  const {
    search, setSearch,
    status, setStatus,
    date, setDate,
    view, setView,
    loading, error, reload,
    filteredAppointments,
    weekDays, weekLabel,
    goToPreviousWeek, goToNextWeek, goToCurrentWeek,
    getAppointmentsByDay,
    summary,
    menuAnchor, menuAppointment, openMenu, closeMenu, runAction, isActing,
  } = useProfessionalAppointments();

  const menuStatus = menuAppointment?.status;
  const isFinished = menuStatus === "cancelled" || menuStatus === "completed";

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.HeaderContainer>
          <Stack>
            <Typography variant="h4" sx={{ color: "#102A56", fontSize: "1.2rem", fontWeight: 700 }}>
              Meus agendamentos
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
              Gerencie seus atendimentos agendados
            </Typography>
          </Stack>
        </Styled.HeaderContainer>

        <Styled.FiltersContainer>
          <Styled.SearchContainer>
            <Search sx={{ fontSize: "1.1rem", color: "text.secondary" }} />
            <Styled.SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar por paciente"
            />
          </Styled.SearchContainer>

          <TextField
            select size="small" value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todas as datas</MenuItem>
            <MenuItem value="today">Hoje</MenuItem>
            <MenuItem value="week">Esta semana</MenuItem>
          </TextField>

          <TextField
            select size="small" value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os status</MenuItem>
            <MenuItem value="scheduled">Agendado</MenuItem>
            <MenuItem value="confirmed">Confirmado</MenuItem>
            <MenuItem value="completed">Concluído</MenuItem>
            <MenuItem value="cancelled">Cancelado</MenuItem>
            <MenuItem value="noShow">Não compareceu</MenuItem>
          </TextField>

          <Styled.ViewButtons>
            <Styled.ViewButton type="button" active={view === "list"} onClick={() => setView("list")}>
              <ViewList fontSize="small" />
              Lista
            </Styled.ViewButton>
            <Styled.ViewButton type="button" active={view === "calendar"} onClick={() => setView("calendar")}>
              <CalendarMonth fontSize="small" />
              Calendário
            </Styled.ViewButton>
          </Styled.ViewButtons>
        </Styled.FiltersContainer>

        <Styled.MainContent>
          <Styled.ScheduleCard>
            <Styled.ScheduleHeader>
              <Typography variant="h6" sx={{ fontSize: "0.95rem", fontWeight: 700 }}>
                {view === "list" ? LIST_TITLES[date] : "Calendário semanal"}
              </Typography>

              {view === "calendar" && (
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <IconButton size="small" onClick={goToPreviousWeek}>
                    <ChevronLeft fontSize="small" />
                  </IconButton>
                  <Button size="small" onClick={goToCurrentWeek}
                    sx={{ fontSize: "0.72rem", textTransform: "none" }}>
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
                action={<Button color="inherit" size="small" onClick={reload}>Tentar de novo</Button>}
              >
                {error}
              </Alert>
            ) : view === "list" ? (
              <Styled.TableWrapper>
                <Table sx={{ minWidth: "720px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data e horário</TableCell>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredAppointments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          <Typography variant="body2" color="text.secondary"
                            sx={{ fontSize: "0.75rem", py: 2 }}>
                            Nenhum agendamento encontrado
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}

                    {filteredAppointments.map((appointment) => (
                      <Styled.StyledTableRow key={appointment.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
                            {appointment.time}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem" }}>
                            {formatShortDate(appointment.date)}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Styled.PatientCell>
                            <Styled.Avatar>{getInitials(appointment.patient)}</Styled.Avatar>
                            <Stack>
                              <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.75rem" }}>
                                {appointment.patient}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.62rem" }}>
                                {appointment.patientInfo}
                              </Typography>
                            </Stack>
                          </Styled.PatientCell>
                        </TableCell>

                        <TableCell>
                          <Styled.Status status={appointment.status}>
                            {getStatusLabel(appointment.status)}
                          </Styled.Status>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton
                            size="small"
                            disabled={isActing}
                            onClick={(event) => openMenu(event.currentTarget, appointment)}
                          >
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
                      <Styled.CalendarTime key={time}>{time}</Styled.CalendarTime>
                    ))}
                  </Styled.CalendarTimeColumn>

                  {weekDays.map((day) => {
                    const dayAppointments = getAppointmentsByDay(day);

                    return (
                      <Styled.CalendarDayColumn key={day.toISOString()}>
                        <Styled.CalendarDayHeader>
                          <Styled.CalendarDayName>{getWeekdayLabel(day)}</Styled.CalendarDayName>
                          <Styled.CalendarDayDate>{formatShortDate(day)}</Styled.CalendarDayDate>
                        </Styled.CalendarDayHeader>

                        <Styled.CalendarAppointments>
                          {dayAppointments.length === 0 && (
                            <Styled.CalendarEmpty>Nenhum agendamento</Styled.CalendarEmpty>
                          )}

                          {dayAppointments.map((appointment) => (
                            <Styled.CalendarAppointment key={appointment.id}>
                              <Styled.CalendarAppointmentTime>
                                {appointment.time}
                              </Styled.CalendarAppointmentTime>
                              <Styled.CalendarAppointmentPatient>
                                {appointment.patient}
                              </Styled.CalendarAppointmentPatient>
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
              <Typography variant="h6" sx={{ fontSize: "0.95rem", fontWeight: 700 }}>
                Resumo
              </Typography>

              <Styled.SummaryItem sx={{ backgroundColor: "#F1F7FF" }}>
                <CalendarToday color="primary" />
                <Styled.SummaryNumber>{loading ? "..." : summary.today}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                  hoje
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#E9FAF1" }}>
                <EventNote sx={{ color: "#219653" }} />
                <Styled.SummaryNumber>{loading ? "..." : summary.week}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                  nesta semana
                </Typography>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#FFF8E8" }}>
                <AccessTime sx={{ color: "#D99400" }} />
                <Styled.SummaryNumber>{loading ? "..." : summary.pending}</Styled.SummaryNumber>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                  aguardando confirmação
                </Typography>
              </Styled.SummaryItem>
            </Styled.SummaryCard>
          </Styled.SummaryColumn>
        </Styled.MainContent>
      </Styled.Container>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem disabled={menuStatus !== "scheduled"} onClick={() => runAction("confirm")}>
          Confirmar
        </MenuItem>
        <MenuItem disabled={isFinished} onClick={() => runAction("complete")}>
          Marcar como concluído
        </MenuItem>
        <MenuItem disabled={isFinished} onClick={() => runAction("cancel")}
          sx={{ color: "error.main" }}>
          Cancelar agendamento
        </MenuItem>
      </Menu>
    </Stack>
  );
};