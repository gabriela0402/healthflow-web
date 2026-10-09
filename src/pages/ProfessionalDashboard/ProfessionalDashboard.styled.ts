import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

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
    padding: "5rem 1rem 2rem",
  },
}));

export const TitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "1rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const CardContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))",
  gap: "1rem",
  marginTop: "1rem",
  width: "100%",
});

export const OverviewDepartmentContainer = styled(Stack)(
  ({ theme }) => ({
    flexDirection: "row",
    width: "100%",
    gap: "1rem",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  }),
);

export const OverviewContainer = styled(Stack)(({ theme }) => ({
  marginTop: "1rem",
  backgroundColor: theme.palette.background.paper,
  width: "60%",
  minHeight: "20rem",
  borderRadius: "0.7rem",
  border: "0.1rem solid #00000011",
  padding: "1.5rem",
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const DepartmentContainer = styled(Stack)(({ theme }) => ({
  marginTop: "1rem",
  backgroundColor: theme.palette.background.paper,
  width: "40%",
  minHeight: "20rem",
  borderRadius: "0.7rem",
  border: "0.1rem solid #00000011",
  padding: "1.5rem",
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const ChartContainer = styled(Box)({
  width: "100%",
  height: "15rem",
  marginTop: "1rem",
});

export const OverviewHeader = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

export const UpcomingContainer = styled(Stack)(({ theme }) => ({
  marginTop: "1rem",
  backgroundColor: theme.palette.background.paper,
  width: "40%",
  minHeight: "20rem",
  borderRadius: "0.7rem",
  border: "0.1rem solid #00000011",
  padding: "1.5rem",
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

import { Button } from "@mui/material";

export const SeeAllButton = styled(Button)(({ theme }) => ({
  color: "#4b6cb3",
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "none",
  padding: 0,
  minWidth: "auto",
  background: "none",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline", 
    opacity: 0.8,
  },
}));