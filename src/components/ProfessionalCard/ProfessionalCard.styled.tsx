import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";
import type { StatusProfessionalProps } from "./ProfessionalCard.types";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  width: "100%",
  minWidth: 0,
  minHeight: "6rem",
  boxSizing: "border-box",
  padding: "1.5rem",
  overflow: "hidden",
  gap: "0.4rem",

  backgroundColor: theme.palette.background.paper,
  border: "0.1rem solid #00000011",
  borderRadius: "0.7rem",

  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "translateY(-3px)",
  },

  [theme.breakpoints.down("sm")]: {
    minHeight: "5.5rem",
  },
}));

export const Status = styled(Typography)<StatusProfessionalProps>(({ theme, status }) => ({
  fontSize: "0.8rem",
  backgroundColor: `${status ? "#d9f1e1" : "#fff7d3"}`,
  color: `${status ? theme.palette.success.main: theme.palette.warning.main}` ,
  padding: "0.3rem",
  borderRadius: "0.3rem",
  fontWeight: "600",
}));
