import React from "react";
import * as Styled from "./ProfessionalCard.styled";
import { Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ButtonWhite } from "../Buttons/Buttons";
import type { ProfessionalCardProps } from "./ProfessionalCard.types";

export const ProfessionalCard = ({name, job, rate, disponibility, local, status}: ProfessionalCardProps) => {
  return (
    <Styled.Container>
      <Stack>
        <Typography variant="h6" sx={{ fontSize: "1rem" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "0.8rem" }}>
          {job}
        </Typography>
      </Stack>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <StarIcon sx={{ color: "#F4B400" }} />
          <Typography>{rate}</Typography>
        </Stack>
        <Styled.Status status={status}>{status ? "Disponível" : "Indisponível"} </Styled.Status>
      </Stack>
      <Stack sx={{mt: 1}}>
        <Stack sx={{ justifyContent: "space-between" ,flexDirection: "row", }}>
          <Stack sx={{flexDirection: "row", }}>
            <Box sx={{ mr: 2 }}>
              <CalendarTodayIcon
                sx={{
                  fontSize: "1rem",
                  color: "#348ad1",
                }}
              />
            </Box>
            <Typography sx={{fontSize:"0.8rem"}}>Próxima disponibilidade</Typography>
          </Stack>
          <Typography sx={{fontSize:"0.9rem", fontWeight:"500"}}>{disponibility}</Typography>
        </Stack>
        <Stack sx={{ justifyContent: "space-between" ,flexDirection: "row", borderBottom:"1px solid #0000000e"}}>
          <Stack sx={{flexDirection: "row", }}>
            <Box sx={{ mr: 2 }}>
              <CalendarTodayIcon
                sx={{
                  fontSize: "1rem",
                  color: "#348ad1",
                }}
              />
            </Box>
            <Typography sx={{fontSize:"0.8rem"}}>Localidade</Typography>
          </Stack>
          <Typography sx={{fontSize:"0.9rem", fontWeight:"500"}}>{local}</Typography>
        </Stack>
        <Stack sx={{flexDirection:"row", gap:"1rem", mt:2}}>
            <ButtonWhite text="Mensagem"/>
            <ButtonWhite text="Ligação"/>
        </Stack>
        
        
      </Stack>
    </Styled.Container>
  );
};
