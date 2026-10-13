import { Stack, Typography } from "@mui/material";
import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./ProfessioanlAppointments.styled";

export const ProfessioanlAppointments = () => {
  return (
    <Stack direction={"row"}>
      <SideBar />
      <Styled.Container>
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
      </Styled.Container>
    </Stack>
  );
};
