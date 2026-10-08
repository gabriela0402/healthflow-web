import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import type { UpcomingStatusProps } from "./UpcomingAppoiment.types";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  borderBottom: "1px solid #00000015",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.04)",
  },

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export const Time = styled(Stack)(({ theme }) => ({
  backgroundColor: "#f4f6f8",
  padding: "0.6rem",
  borderRadius: "0.5rem",
  marginRight: "1rem",
  color: theme.palette.primary.main,
  border: "1px solid #00000010",
}));

export const Status = styled(Stack)<UpcomingStatusProps>(
  ({ theme, status }) => ({
    backgroundColor: `${status == "Confirmado" ? "#f4f6f8" : "#feffc2"}`,
    color: `${status == "Confirmado" ? "#398de0" : "#d8ab49"}`,
    padding: "0.5rem",
    borderRadius: "0.5rem",

    [theme.breakpoints.down("lg")]: {
      marginTop:"1rem",
    },
  }),
);
