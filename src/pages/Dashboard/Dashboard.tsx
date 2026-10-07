import { SideBar } from "../../components/SideBar/SideBar";
import { Box, Stack, Typography } from "@mui/material";
import * as Styled from "./Dashboard.styled";
import { Card } from "../../components/Card/Card";

import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { getFormattedDate } from "./Dashboard.utils";

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

        <Styled.CardContainer
        >
          <Card icon={PeopleIcon} title="Pacientes" num={"234"} />
          <Card icon={CalendarTodayIcon} title="Agendamentos" num={"234"} />
          <Card icon={PeopleIcon} title="Profissionais" num={"34"} />
          <Card icon={AccessTimeIcon} title="Pendentes" num={"4"} />
        </Styled.CardContainer>
        <Stack
         sx={{
           flexDirection: "row",
           width: " 100%",
           justifyContent:" space-between"
        }}
        >
          <Stack
            sx={{
              marginTop: "1rem",
              backgroundColor: "white",
              width: "68%",
              minHeight: " 20rem",
              borderRadius: "0.7rem",
            }}
          >oii</Stack>
          <Stack
            sx={{
              marginTop: "1rem",
              backgroundColor: "white",
              width: "30%",
              minHeight: " 40%",
              borderRadius: "0.7rem",
            }}
          >oii</Stack>
        </Stack>

        <Stack
         sx={{
           flexDirection: "row",
           width: " 100%",
           justifyContent:" space-between"
        }}
        >
          <Stack
            sx={{
              marginTop: "1rem",
              backgroundColor: "white",
              width: "68%",
              minHeight: " 20rem",
              borderRadius: "0.7rem",
            }}
          >oii</Stack>
          <Stack
            sx={{
              marginTop: "1rem",
              backgroundColor: "white",
              width: "30%",
              minHeight: " 40%",
              borderRadius: "0.7rem",
            }}
          >oii</Stack>
        </Stack>
      </Styled.Container>
    </Stack>
  );
};
