import { Stack, Typography } from "@mui/material";
import * as Styled from "./ProfessionalDashboard.styled";
import { SideBar } from "../../components/SideBar/SideBar";

import { getFormattedDate } from "./ProfessionalDashboard.utils";
import { appointmentData } from "./ProfessionalDashboard.utils";

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
import { UpcomingAppoiment } from "../../components/UpcomingAppoiment/UpcomingAppoiment";

export const ProfessionalDashboard = () => {
  const dataFormatada = getFormattedDate();

  return (
    <Stack direction={"row"}>
      <SideBar />
      <Styled.Container>
        <Styled.TitleContainer>
          <Stack spacing={0.4}>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Bem vindo(a), Dr. Shawn
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Veja um resumo dos seus atendimentos
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
          <Card
            icon={CalendarTodayIcon}
            title="Consultas hoje"
            num={"6"}
            type="dashboard"
          />
          <Card
            icon={PeopleIcon}
            title="Pacientes"
            num={"234"}
            type="dashboard"
          />
          <Card
            icon={AccessTimeIcon}
            title="Pendentes"
            num={"3"}
            type="dashboard"
          />
          <Card
            icon={CalendarTodayIcon}
            title="Próximo atendimento"
            num={"14:20"}
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
                  Quantidade de atendimentos realizados por dia
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

          <Styled.UpcomingContainer>
            <Stack
              sx={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                Próximos Atendimentos
              </Typography>
              <Styled.SeeAllButton onClick={() => {}}>
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
