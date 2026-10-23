import AccessTime from "@mui/icons-material/AccessTime";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CheckCircle from "@mui/icons-material/CheckCircle";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
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
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./Appointments.styled";
import { useAppointments } from "./Appointments.hook";
import type { AppointmentStatus } from "./Appointments.types";
import {
  formatLongDate,
  formatShortDate,
  getInitials,
  getStatusLabel,
  STATUS_COLORS,
} from "./Appoiments.utils";

const LIST_TITLES: Record<string, string> = {
  all: "Todos os agendamentos",
  today: "Agenda de hoje",
  week: "Agenda da semana",
};

const LEGEND: { status: AppointmentStatus; label: string }[] = [
  { status: "confirmed", label: "Confirmados" },
  { status: "scheduled", label: "Agendados" },
  { status: "completed", label: "Concluídos" },
  { status: "cancelled", label: "Cancelados" },
  { status: "noShow", label: "Não compareceu" },
];

export const Appointments = () => {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    date,
    setDate,
    professional,
    setProfessional,
    status,
    setStatus,
    professionals,
    filteredAppointments,
    summary,
    statusCounts,
    totalCount,
    donutGradient,
    upcoming,
    showAllUpcoming,
    toggleShowAllUpcoming,
    loading,
    error,
    reload,
    menuAnchor,
    menuAppointment,
    openMenu,
    closeMenu,
    runAction,
    isActing,
  } = useAppointments();

  const menuStatus = menuAppointment?.status;
  const isFinished = menuStatus === "cancelled" || menuStatus === "completed";

  return (
    <Stack>
      <SideBar />

      <Styled.Container>
        <Styled.HeaderContainer>
          <Styled.TitleContainer>
            <Stack>
              <Typography variant="h4" sx={{ fontSize: "1.6rem" }}>
                Agendamentos
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Administre os agendamentos da clínica.
              </Typography>
            </Stack>

            <Styled.AddButtonContainer>
              <ButtonBlue
                text="+ Adicionar agendamento"
                onClick={() => navigate("/appointments/new")}
              />
            </Styled.AddButtonContainer>
          </Styled.TitleContainer>
        </Styled.HeaderContainer>

        <Styled.FiltersContainer>
          <Styled.SearchWrapper>
            <Styled.SearchIcon />

            <Styled.SearchInput
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por paciente, profissional ou especialidade"
            />
          </Styled.SearchWrapper>

          <TextField
            select
            size="small"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todas as datas</MenuItem>
            <MenuItem value="today">Hoje</MenuItem>
            <MenuItem value="week">Esta semana</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={professional}
            onChange={(event) => setProfessional(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os profissionais</MenuItem>
            {professionals.map((item) => (
              <MenuItem key={item.id} value={String(item.id)}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os status</MenuItem>
            <MenuItem value="scheduled">Agendado</MenuItem>
            <MenuItem value="confirmed">Confirmado</MenuItem>
            <MenuItem value="completed">Concluído</MenuItem>
            <MenuItem value="cancelled">Cancelado</MenuItem>
            <MenuItem value="noShow">Não compareceu</MenuItem>
          </TextField>
        </Styled.FiltersContainer>

        <Styled.ContentContainer>
          <Styled.ScheduleContainer>
            <Styled.ScheduleHeader>
              <Typography variant="h6">{LIST_TITLES[date]}</Typography>

              <Typography variant="body2" color="text.secondary">
                {formatLongDate(new Date())}
              </Typography>
            </Styled.ScheduleHeader>

            <Styled.TableWrapper>
              <Table sx={{ minWidth: "850px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Data e horário</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Profissional</TableCell>
                    <TableCell>Especialidade</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Ações</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <CircularProgress size={26} sx={{ my: 3 }} />
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading && error && (
                    <TableRow>
                      <TableCell colSpan={6}>
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
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading && !error && filteredAppointments.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ py: 2 }}
                        >
                          Nenhum agendamento encontrado
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}

                  {!loading &&
                    !error &&
                    filteredAppointments.map((appointment) => (
                      <Styled.StyledTableRow key={appointment.id} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {appointment.time}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {formatShortDate(appointment.date)}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Styled.PatientCell>
                            <Styled.Avatar>
                              {getInitials(appointment.patient)}
                            </Styled.Avatar>

                            <Stack>
                              <Typography variant="body2" fontWeight={600}>
                                {appointment.patient}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {appointment.patientInfo}
                              </Typography>
                            </Stack>
                          </Styled.PatientCell>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2">
                            {appointment.professional}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="body2">
                            {appointment.specialty}
                          </Typography>
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
                            onClick={(event) =>
                              openMenu(event.currentTarget, appointment)
                            }
                          >
                            <MoreHoriz fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </Styled.StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </Styled.TableWrapper>
          </Styled.ScheduleContainer>

          <Styled.SideSummaryContainer>
            <Styled.SummaryCard>
              <Styled.SummaryCardHeader>
                <Typography variant="h6">Resumo diário</Typography>
              </Styled.SummaryCardHeader>

              <Styled.SummaryItem sx={{ backgroundColor: "#EAF3FF" }}>
                <CalendarToday color="primary" />

                <Stack>
                  <Typography variant="h5" sx={{ fontSize: "1.3rem" }} fontWeight={700}>
                    {loading ? "..." : summary.today}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    agendamentos hoje
                  </Typography>
                </Stack>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#E7F7EF" }}>
                <CheckCircle sx={{ color: "#219653" }} />

                <Stack>
                  <Typography variant="h5" sx={{ fontSize: "1.3rem" }} fontWeight={700}>
                    {loading ? "..." : summary.week}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    confirmados
                  </Typography>
                </Stack>
              </Styled.SummaryItem>

              <Styled.SummaryItem sx={{ backgroundColor: "#FFF5DD" }}>
                <AccessTime sx={{ color: "#D99400" }} />

                <Stack>
                  <Typography variant="h5" sx={{ fontSize: "1.3rem" }} fontWeight={700}>
                    {loading ? "..." : summary.pending}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    aguardando confirmação
                  </Typography>
                </Stack>
              </Styled.SummaryItem>
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Typography variant="h6">Status dos agendamentos</Typography>

              <Styled.Donut style={{ background: donutGradient }}>
                <Styled.DonutValue>
                  <Typography variant="h5" fontWeight={700}>
                    {totalCount}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Total
                  </Typography>
                </Styled.DonutValue>
              </Styled.Donut>

              {LEGEND.map((item) => (
                <Styled.LegendItem key={item.status}>
                  <Styled.LegendColor color={STATUS_COLORS[item.status]} />
                  <Typography variant="body2">{item.label}</Typography>
                  <Typography variant="body2">
                    {statusCounts[item.status]}
                  </Typography>
                </Styled.LegendItem>
              ))}
            </Styled.SummaryCard>

            <Styled.SummaryCard>
              <Styled.SummaryCardHeader>
                <Typography variant="h6">Próximos</Typography>

                <Typography
                  variant="body2"
                  color="primary"
                  onClick={toggleShowAllUpcoming}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {showAllUpcoming ? "Ver menos" : "Ver mais"}
                </Typography>
              </Styled.SummaryCardHeader>

              {!loading && upcoming.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Nenhum agendamento futuro.
                </Typography>
              )}

              {upcoming.map((appointment) => (
                <Styled.UpcomingItem key={appointment.id}>
                  <Stack>
                    <Typography variant="body2">{appointment.patient}</Typography>

                    <Typography variant="caption" color="text.secondary">
                      {appointment.specialty}
                    </Typography>
                  </Stack>

                  <Typography variant="caption" color="primary">
                    {formatShortDate(appointment.date)} • {appointment.time}
                  </Typography>
                </Styled.UpcomingItem>
              ))}
            </Styled.SummaryCard>
          </Styled.SideSummaryContainer>
        </Styled.ContentContainer>
      </Styled.Container>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
        <MenuItem
          disabled={menuStatus !== "scheduled"}
          onClick={() => runAction("confirm")}
        >
          Confirmar
        </MenuItem>

        <MenuItem
          disabled={isFinished}
          onClick={() => runAction("complete")}
        >
          Marcar como concluído
        </MenuItem>

        <MenuItem
          disabled={isFinished}
          onClick={() => runAction("cancel")}
          sx={{ color: "error.main" }}
        >
          Cancelar agendamento
        </MenuItem>
      </Menu>
    </Stack>
  );
};