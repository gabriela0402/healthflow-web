import { Alert, Button, Stack, Typography } from "@mui/material";
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

import * as Styled from "./ProfessionalDashboard.styled";
import { SideBar } from "../../components/SideBar/SideBar";
import { Card } from "../../components/Card/Card";
import { UpcomingAppoiment } from "../../components/UpcomingAppoiment/UpcomingAppoiment";
import { getFormattedDate } from "./ProfessionalDashboard.utils";
import { useProfessionalDashboard } from "./ProfessionalDashboard.hook";
import { formatShortDate } from "../ProfessioanlAppointments/ProfessionalAppointments.utils";

export const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  const dataFormatada = getFormattedDate();

  const {
    firstName,
    loading,
    error,
    reload,
    patientsCount,
    stats,
    weekChart,
    upcoming,
  } = useProfessionalDashboard();

  const show = (value: number | string) => (loading ? "..." : String(value));

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
              Veja um resumo dos seus atendimentos
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
            icon={CalendarTodayIcon}
            title="Consultas hoje"
            num={show(stats.today)}
            type="dashboard"
          />
          <Card
            icon={PeopleIcon}
            title="Pacientes"
            num={show(patientsCount)}
            type="dashboard"
          />
          <Card
            icon={AccessTimeIcon}
            title="Pendentes"
            num={show(stats.pending)}
            type="dashboard"
          />
          <Card
            icon={CalendarTodayIcon}
            title="Próximo atendimento"
            num={show(stats.next)}
            type="dashboard"
          />
        </Styled.CardContainer>

        <Styled.OverviewDepartmentContainer>
          <Styled.OverviewContainer>
            <Styled.OverviewHeader>
              <Stack>
                <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                  Atendimentos da semana
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem" }}
                  color="text.secondary"
                >
                  Quantidade de atendimentos por dia
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Semana atual
              </Typography>
            </Styled.OverviewHeader>

            <Styled.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weekChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    name="Atendimentos"
                    stroke="#1976D2"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#1976D2" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Styled.ChartContainer>
          </Styled.OverviewContainer>

          <Styled.UpcomingContainer>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                Próximos Atendimentos
              </Typography>
              <Styled.SeeAllButton onClick={() => navigate("/my-appointments")}>
                Ver Tudo
              </Styled.SeeAllButton>
            </Stack>

            <Stack>
              {!loading && upcoming.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Nenhum atendimento futuro.
                </Typography>
              )}

              {upcoming.map((appointment) => (
                <UpcomingAppoiment
                  key={appointment.id}
                  time={appointment.time}
                  name={appointment.patient}
                  job={formatShortDate(appointment.date)}
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
