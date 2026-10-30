import styled from "@emotion/styled";
import { Box, Stack, Button } from "@mui/material";
import type { AppointmentStatus } from "../ProfessioanlAppointments/ProfessionalAppointments.types";

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

export const OverviewDepartmentContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  width: "100%",
  gap: "1rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const OverviewContainer = styled(Stack)(({ theme }) => ({
  marginTop: "1rem",
  backgroundColor: theme.palette.background.paper,
  width: "60%",
  minWidth: 0,
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
  minWidth: 0,
  containerType: "inline-size",
  minHeight: "20rem",
  borderRadius: "0.7rem",
  border: "0.1rem solid #00000011",
  padding: "1.5rem",
  boxSizing: "border-box",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

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

export const SectionHeader = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "1rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid #E8EDF3",
});

export const AppointmentList = styled(Stack)({
  width: "100%",
});

export const AppointmentItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.8rem",
  minWidth: 0,
  padding: "0.9rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));
export const AppointmentInfo = styled(Stack)({
  flex: "1 1 0",
  minWidth: 0,

  "@container (max-width: 420px)": {
    flex: "1 1 calc(100% - 7.3rem)",
  },
});

export const DateBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "3.2rem",
  minWidth: "3.2rem",
  height: "3.2rem",
  borderRadius: "0.55rem",
  backgroundColor: "#F1F7FF",
  color: "#102A56",

  "& p": {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 700,
    lineHeight: 1,
  },

  "& span": {
    marginTop: "0.25rem",
    color: "#6B7A90",
    fontSize: "0.62rem",
    fontWeight: 600,
  },
});

export const Time = styled("span")({
  minWidth: "2.5rem",
  color: "#102A56",
  fontSize: "0.78rem",
  fontWeight: 600,
});

export const PatientAvatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.3rem",
  height: "2.3rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "0.65rem",
  fontWeight: 700,

  "@container (max-width: 420px)": {
    display: "none",
  },
}));

export const Status = styled(Box)<{
  status: AppointmentStatus;
}>(({ status }) => {
  const colors: Record<
    AppointmentStatus,
    { background: string; color: string }
  > = {
    scheduled: { background: "#EAF3FF", color: "#1976D2" },
    confirmed: { background: "#E7F7EF", color: "#219653" },
    cancelled: { background: "#FDECEC", color: "#D64545" },
    completed: { background: "#F1F1F5", color: "#5F6B7A" },
    noShow: { background: "#FFF4E5", color: "#C77700" },
  };

  return {
    padding: "0.35rem 0.65rem",
    borderRadius: "1rem",
    backgroundColor: colors[status].background,
    color: colors[status].color,
    fontSize: "0.68rem",
    fontWeight: 600,
    whiteSpace: "nowrap",

    "@container (max-width: 420px)": {
      marginLeft: "4rem",
    },
  };
});
