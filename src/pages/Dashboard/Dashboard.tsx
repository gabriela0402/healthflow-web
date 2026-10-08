import { SideBar } from "../../components/SideBar/SideBar";
import { Box, Stack, Typography } from "@mui/material";
import * as Styled from "./Dashboard.styled";
import { Card } from "../../components/Card/Card";

import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
import { appointmentData } from "./Dashboard.utils";
import { Activity } from "../../components/Activity/Activity";
import { UpcomingAppoiment } from "../../components/UpcomingAppoiment/UpcomingAppoiment";

export const Dashboard = () => {
  const dataFormatada = getFormattedDate();

  return (
    <Stack direction={"row"}>
      <SideBar />
      <Styled.Container>
        <Styled.TitleContainer>
          <Stack spacing={0.4}>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Bem vindo(a), Gabriela
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Aqui é o que ocorre na sua clínica atualmente
            </Typography>
          </Stack>

          <Stack
            spacing={0.5}
            sx={{ flexDirection: "row", alignItems: "center" }}
          >
            <Typography
              sx={{ color: "#4a5568", fontWeight: 500, fontSize: "0.8rem" }}
            >
              {dataFormatada}
            </Typography>
          </Stack>
        </Styled.TitleContainer>

        <Styled.CardContainer>
          <Card icon={PeopleIcon} title="Pacientes" num={"234"}  type="dashboard"/>
          <Card icon={CalendarTodayIcon} title="Agendamentos" num={"234"}  type="dashboard"/>
          <Card icon={PeopleIcon} title="Profissionais" num={"34"}  type="dashboard"/>
          <Card icon={AccessTimeIcon} title="Pendentes" num={"4"} type="dashboard" />
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
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF0" />

                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />

                  <YAxis tick={{ fontSize: 12 }} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#1976D2"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#1976D2",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Styled.ChartContainer>
          </Styled.OverviewContainer>

          <Styled.DepartmentContainer>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Saúde do departamento
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem" }}
              color="text.secondary"
            >
              Desempenho geral da clínica
            </Typography>

            <Styled.HealthPercentage>
              <Styled.PercentageText>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ fontSize: "1.5rem" }}
                >
                  92%
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  saudável
                </Typography>
              </Styled.PercentageText>
            </Styled.HealthPercentage>

            <Styled.DepartmentStats>
              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  58
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Profissionais
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  12
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Especialidades
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  4.8
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Avaliação
                </Typography>
              </Styled.DepartmentStat>
            </Styled.DepartmentStats>
          </Styled.DepartmentContainer>
        </Styled.OverviewDepartmentContainer>
        <Styled.OverviewDepartmentContainer>
          <Styled.ActivityContainer>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                Atividade Recente
              </Typography>
              <Styled.SeeAllButton onClick={() => {}}>
                Ver Tudo
              </Styled.SeeAllButton>
            </Stack>
            <Stack sx={{ mt: 2 }}>
              <Activity
                icon={PeopleIcon}
                title="New appoiment"
                description="oioioioioio"
                time="123hrs ago"
              />
              <Activity
                icon={PeopleIcon}
                title="New appoiment"
                description="oioioioioio"
                time="123hrs ago"
              />
              <Activity
                icon={PeopleIcon}
                title="New appoiment"
                description="oioioioioio"
                time="123hrs ago"
              />
            </Stack>
          </Styled.ActivityContainer>
          <Styled.UpcomingContainer>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                Agendamentos
              </Typography>
              <Styled.SeeAllButton
                onClick={() => {
                }}
              >
                Ver Tudo
              </Styled.SeeAllButton>
            </Stack>
            <Stack>
              <UpcomingAppoiment
                time="13:30"
                name="Taylor Swift"
                job="Cardiologista"
                status="Confirmado"
              />
              <UpcomingAppoiment
                time="10:10"
                name="Justin Bieber"
                job="Psiquiatra"
                status="Pendente"
              />
              <UpcomingAppoiment
                time="20:10"
                name="Beyonce"
                job="Fisioterapeuta"
                status="Pendente"
              />
              <UpcomingAppoiment
                time="20:10"
                name="Shakira"
                job="Cirugião Plástico"
                status="Confirmado"
              />
            </Stack>
          </Styled.UpcomingContainer>
        </Styled.OverviewDepartmentContainer>
      </Styled.Container>
    </Stack>
  );
};
