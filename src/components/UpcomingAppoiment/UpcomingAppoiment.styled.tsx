import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import type { UpcomingStatusProps } from "./UpcomingAppoiment.types";

export const Container = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1rem 0",
  borderBottom: "1px solid #00000015",
  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "scale(1.01)",
  },
});

export const Info = styled(Stack)({
  flex: "1 1 12rem",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  minWidth: 0,
});

export const Time = styled(Stack)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  backgroundColor: "#f4f6f8",
  padding: "0.6rem",
  borderRadius: "0.5rem",
  color: theme.palette.primary.main,
  border: "1px solid #00000010",
}));

export const Status = styled(Stack)<UpcomingStatusProps>(({ status }) => ({
  flexShrink: 0,
  backgroundColor: status === "Confirmado" ? "#f4f6f8" : "#feffc2",
  color: status === "Confirmado" ? "#398de0" : "#d8ab49",
  padding: "0.5rem",
  borderRadius: "0.5rem",
}));