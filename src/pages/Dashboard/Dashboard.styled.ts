import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: "2.5rem",
  marginLeft: "250px",
  width: "calc(100% - 250px)",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    width: "100%",
    paddingTop: "5rem",
  },
}));

export const TitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  }
}));

export const CardContainer = styled(Stack)(({ theme }) => ({
  marginTop: "1rem",
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
