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

export const Dashboard = () => {
  const dataFormatada = getFormattedDate();

  return (
    <Stack direction={"row"}>
      <SideBar />
      <Styled.Container>
        <Styled.TitleContainer>
          <Stack spacing={1.4}>
            <Typography variant="h4">Bem vindo(a), Gabriela</Typography>
            <Typography variant="body1">
              Aqui é o que ocorre na sua clínica atualmente
            </Typography>
          </Stack>

          <Stack
            spacing={0.5}
            sx={{ flexDirection: "row", alignItems: "center" }}
          >
            <CalendarTodayIcon sx={{ color: "#4a5568", fontSize: "1.2rem" }} />
            <Typography sx={{ color: "#4a5568", fontWeight: 500 }}>
              {dataFormatada}
            </Typography>
          </Stack>
        </Styled.TitleContainer>

        <Styled.CardContainer>
          <Card icon={PeopleIcon} title="Pacientes" num={"234"} />
          <Card icon={CalendarTodayIcon} title="Agendamentos" num={"234"} />
          <Card icon={PeopleIcon} title="Profissionais" num={"34"} />
          <Card icon={AccessTimeIcon} title="Pendentes" num={"4"} />
        </Styled.CardContainer>
        <Styled.OverviewDepartmentContainer>
          <Styled.OverviewContainer>
            <Styled.OverviewHeader>
              <Stack>
                <Typography variant="h5">Fluxo de pacientes</Typography>

                <Typography variant="body2" color="text.secondary">
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
            <Typography variant="h5">Saúde do departamento</Typography>

            <Typography variant="body2" color="text.secondary">
              Desempenho geral da clínica
            </Typography>

            <Styled.HealthPercentage>
              <Styled.PercentageText>
                <Typography variant="h4" fontWeight={700}>
                  92%
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  saudável
                </Typography>
              </Styled.PercentageText>
            </Styled.HealthPercentage>

            <Styled.DepartmentStats>
              <Styled.DepartmentStat>
                <Typography variant="h5">58</Typography>

                <Typography variant="body2" color="text.secondary">
                  Profissionais
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5">12</Typography>

                <Typography variant="body2" color="text.secondary">
                  Especialidades
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5">4.8</Typography>

                <Typography variant="body2" color="text.secondary">
                  Avaliação
                </Typography>
              </Styled.DepartmentStat>
            </Styled.DepartmentStats>
          </Styled.DepartmentContainer>
        </Styled.OverviewDepartmentContainer>
      </Styled.Container>
    </Stack>
  );
};
