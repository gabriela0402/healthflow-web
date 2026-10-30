import { SideBar } from "../../components/SideBar/SideBar";
import { Alert, Button, Stack, Typography } from "@mui/material";
import * as Styled from "./Dashboard.styled";
import { Card } from "../../components/Card/Card";

import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useNavigate } from "react-router-dom";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getFormattedDate } from "./Dashboard.utils";
import { useDashboard } from "./Dashboard.hook";
import { Activity } from "../../components/Activity/Activity";
import { UpcomingAppoiment } from "../../components/UpcomingAppoiment/UpcomingAppoiment";
import { formatShortDate } from "../Appointments/Appoiments.utils";

export const Dashboard = () => {
  const navigate = useNavigate();
  const dataFormatada = getFormattedDate();

  const {
    firstName,
    loading,
    error,
    reload,
    patientsCount,
    professionalsCount,
    specialtiesCount,
    stats,
    monthlyFlow,
    health,
    recent,
    upcoming,
  } = useDashboard();

  const show = (value: number) => (loading ? "..." : String(value));

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.TitleContainer>
          <Stack spacing={0.4}>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Bem vindo(a){firstName ? `, ${firstName}` : ""}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Aqui é o que ocorre na sua clínica atualmente
            </Typography>
          </Stack>

          <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
            <Typography
              sx={{ color: "#4a5568", fontWeight: 500, fontSize: "0.8rem" }}
            >
              {dataFormatada}
            </Typography>
          </Stack>
        </Styled.TitleContainer>

        {error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={reload}>
                Tentar de novo
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        <Styled.CardContainer>
          <Card
            icon={PeopleIcon}
            title="Pacientes"
            num={show(patientsCount)}
            type="dashboard"
          />
          <Card
            icon={CalendarTodayIcon}
            title="Agendamentos"
            num={show(stats.appointments)}
            type="dashboard"
          />
          <Card
            icon={PeopleIcon}
            title="Profissionais"
            num={show(professionalsCount)}
            type="dashboard"
          />
          <Card
            icon={AccessTimeIcon}
            title="Pendentes"
            num={show(stats.pending)}
            type="dashboard"
          />
        </Styled.CardContainer>

        <Styled.OverviewDepartmentContainer>
          <Styled.OverviewContainer>
            <Styled.OverviewHeader>
              <Stack>
                <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                  Fluxo de pacientes
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem" }}
                  color="text.secondary"
                >
                  Total de agendamentos por mês
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Últimos 7 meses
              </Typography>
            </Styled.OverviewHeader>

            <Styled.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    name="Agendamentos"
                    stroke="#1976D2"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#1976D2" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Styled.ChartContainer>
          </Styled.OverviewContainer>

          <Styled.DepartmentContainer>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Desempenho da clínica
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem" }}
              color="text.secondary"
            >
              Agendamentos sem cancelamento ou falta
            </Typography>

            <Styled.HealthPercentage
              style={{
                background:
                  health === null
                    ? "#37699728"
                    : `conic-gradient(#1976D2 0% ${health}%, #37699728 ${health}% 100%)`,
              }}
            >
              <Styled.PercentageText>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ fontSize: "1.5rem" }}
                >
                  {loading || health === null ? "—" : `${health}%`}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  aproveitados
                </Typography>
              </Styled.PercentageText>
            </Styled.HealthPercentage>

            <Styled.DepartmentStats>
              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  {show(professionalsCount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Profissionais
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  {show(specialtiesCount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Especialidades
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  {show(stats.cancelled)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cancelados
                </Typography>
              </Styled.DepartmentStat>
            </Styled.DepartmentStats>
          </Styled.DepartmentContainer>
        </Styled.OverviewDepartmentContainer>

        <Styled.OverviewDepartmentContainer>
          <Styled.ActivityContainer>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                Atividade recente
              </Typography>
              <Styled.SeeAllButton
                type="button"
                onClick={() => navigate("/appointments")}
              >
                Ver tudo
              </Styled.SeeAllButton>
            </Stack>

            <Stack sx={{ mt: 2 }}>
              {!loading && recent.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  Nenhuma atividade ainda.
                </Typography>
              )}

              {recent.map((appointment) => (
                <Activity
                  key={appointment.id}
                  icon={CalendarTodayIcon}
                  title="Novo agendamento"
                  description={`${appointment.patient} com ${appointment.professional}`}
                  time={`${formatShortDate(appointment.date)} • ${appointment.time}`}
                />
              ))}
            </Stack>
          </Styled.ActivityContainer>

          <Styled.UpcomingContainer>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                Próximos agendamentos
              </Typography>
              <Styled.SeeAllButton
                type="button"
                onClick={() => navigate("/appointments")}
              >
                Ver tudo
              </Styled.SeeAllButton>
            </Stack>

            <Stack>
              {!loading && upcoming.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Nenhum agendamento futuro.
                </Typography>
              )}

              {upcoming.map((appointment) => (
                <UpcomingAppoiment
                  key={appointment.id}
                  time={`${formatShortDate(appointment.date)} • ${appointment.time}`}
                  name={appointment.patient}
                  job={appointment.specialty}
                  status={
                    appointment.status === "confirmed"
                      ? "Confirmado"
                      : "Pendente"
                  }
                />
              ))}
            </Stack>
          </Styled.UpcomingContainer>
        </Styled.OverviewDepartmentContainer>
      </Styled.Container>
    </Stack>
  );
};
