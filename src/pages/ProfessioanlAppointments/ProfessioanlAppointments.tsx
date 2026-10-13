import AccessTime from "@mui/icons-material/AccessTime";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Search from "@mui/icons-material/Search";
import ViewList from "@mui/icons-material/ViewList";

import {
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
import * as Styled from "./ProfessioanlAppointments.styled";
import { useProfessionalAppointments } from "./ProfessionalAppointments.hooks";
import { getInitials, getStatusLabel } from "./ProfessionalAppointments.utils";

import { appointments } from "./ProfessionalAppointments.utils";

export const ProfessioanlAppointments = () => {
  const {
    search,
    setSearch,
    status,
    setStatus,
    view,
    setView,
    days,
    filteredAppointments,
    getAppointmentsByDay,
  } = useProfessionalAppointments();

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

            <Styled.SearchInput placeholder="Pesquisar agendamentos" />
          </Styled.SearchContainer>

          <Styled.FilterSelect defaultValue="date">
            <option value="date">Data</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
          </Styled.FilterSelect>

          <Styled.FilterSelect defaultValue="status">
            <option value="status">Status</option>
            <option value="confirmed">Confirmado</option>
            <option value="scheduled">Agendado</option>
            <option value="cancelled">Cancelado</option>
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
                {view === "list" ? "Agenda de hoje" : "Calendário semanal"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: "0.72rem" }}
              >
                Terça-feira, 12 de março de 2024
              </Typography>
            </Styled.ScheduleHeader>

            {view === "list" ? (
              <Styled.TableWrapper>
                <Table sx={{ minWidth: "720px" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Horário</TableCell>
                      <TableCell>Paciente</TableCell>
                      <TableCell>Especialidade</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
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
                        </TableCell>

                        <TableCell>
                          <Styled.PatientCell>
                            <Styled.Avatar>
                              {getInitials(appointment.patient)}
                            </Styled.Avatar>

                            <Stack>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{ fontSize: "0.75rem" }}
                              >
                                {appointment.patient}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontSize: "0.62rem" }}
                              >
                                {appointment.age} anos • {appointment.code}
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
                    {[
                      "08:00",
                      "09:00",
                      "10:00",
                      "11:00",
                      "12:00",
                      "13:00",
                      "14:00",
                      "15:00",
                    ].map((time) => (
                      <Styled.CalendarTime key={time}>
                        {time}
                      </Styled.CalendarTime>
                    ))}
                  </Styled.CalendarTimeColumn>

                  {days.map((day) => {
                    const dayAppointments = getAppointmentsByDay(day);

                    return (
                      <Styled.CalendarDayColumn key={day}>
                        <Styled.CalendarDayHeader>
                          <Styled.CalendarDayName>{day}</Styled.CalendarDayName>

                          <Styled.CalendarDayDate>
                            12 mar.
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
                                {appointment.patient}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                  }}
                >
                  Hoje
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  12 mar. 2024
                </Typography>
              </Stack>

              <Styled.SummaryItem sx={{ backgroundColor: "#F1F7FF" }}>
                <CalendarToday color="primary" />

                <Styled.SummaryNumber>8</Styled.SummaryNumber>

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

                <Styled.SummaryNumber>5</Styled.SummaryNumber>

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

                <Styled.SummaryNumber>2</Styled.SummaryNumber>

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
