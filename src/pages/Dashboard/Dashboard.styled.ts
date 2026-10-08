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

export const CardContainer = styled(Stack)({
  marginTop: "1rem",
  width: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "1rem",
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

export const HealthPercentage = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "8rem",
  height: "8rem",
  margin: "1.5rem auto",
  borderRadius: "50%",
  backgroundColor: "#37699728",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    width: "6.8rem",
    height: "6.8rem",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const PercentageText = styled(Stack)({
  position: "relative",
  zIndex: 1,
  alignItems: "center",
});

export const DepartmentStats = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  marginTop: "1rem",

  [theme.breakpoints.down("lg")]: {
    flexDirection:"column",
  },
}));

export const DepartmentStat = styled(Stack)({
  flex: 1,
  alignItems: "center",
  textAlign: "center",
  padding: "0 0.75rem",
});

export const StatDivider = styled(Box)(({ theme }) => ({
  width: "1px",
  backgroundColor: theme.palette.divider,
}));

export const ActivityContainer = styled(Stack)(({ theme }) => ({
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