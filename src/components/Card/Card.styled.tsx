import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import type { ContainerProps } from "./Card.types";

export const Container = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "cardType",
})<ContainerProps>(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  minWidth: 0,
  minHeight: "6rem",
  boxSizing: "border-box",
  padding: "0 0.3rem",
  overflow: "hidden",

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