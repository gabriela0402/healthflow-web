import styled from "@emotion/styled";
import { Box, Button, Stack, IconButton } from "@mui/material";
import type { AppointmentStatus } from "../PatientAppointments/PatientAppointments.types";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: "2.5rem",
  marginLeft: "250px",
  width: "calc(100% - 250px)",
  boxSizing: "border-box",
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    width: "100%",
    padding: "5rem 1rem 2rem",
  },
}));

export const TitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const DateContainer = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",
});

export const CardContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1rem",
  width: "100%",
  marginTop: "1.5rem",

  "& > *": {
    width: "100%",
  },

  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

export const ContentGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)",
  gap: "1rem",
  width: "100%",
  marginTop: "1.5rem",

  "@media (max-width: 1000px)": {
    gridTemplateColumns: "1fr",
  },
});

export const DetailsButton = styled(IconButton)({
  marginLeft: "auto",
  flexShrink: 0,
});

export const AppointmentsCard = styled(Stack)(({ theme }) => ({
  minWidth: 0,
  padding: "1.25rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
  boxSizing: "border-box",
}));

export const SectionHeader = styled(Stack)({
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",
  paddingBottom: "1rem",
  borderBottom: "1px solid #E8EDF3",
});

export const SectionLink = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.15rem",
  minWidth: "fit-content",
  padding: 0,
  color: theme.palette.primary.main,
  fontSize: "0.78rem",
  textTransform: "none",
}));

export const AppointmentList = styled(Stack)({
  width: "100%",
});

export const AppointmentItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.8rem",
  minWidth: 0,
  padding: "0.9rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

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

export const ProfessionalAvatar = styled(Box)(({ theme }) => ({
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
}));

export const Location = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.2rem",
  marginTop: "0.25rem",
  color: "#7A8798",
  fontSize: "0.68rem",

  "& svg": {
    fontSize: "0.85rem",
  },
});

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

    "@media (max-width: 600px)": {
      marginLeft: "4.1rem",
    },
  };
});

export const HelpCard = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  minWidth: 0,
  padding: "1.5rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
  textAlign: "center",
}));

export const HelpIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "4rem",
  height: "4rem",
  marginBottom: "0.8rem",
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,

  "& svg": {
    fontSize: "2rem",
  },
}));

export const HelpButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  minHeight: "44px",
  marginTop: "1.2rem",
  borderRadius: "0.55rem",
  backgroundColor: theme.palette.primary.main,
  color: "#FFFFFF",
  fontSize: "0.8rem",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#1769AA",
  },
}));

export const HelpOutlineButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  width: "100%",
  minHeight: "44px",
  marginTop: "0.7rem",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "0.55rem",
  color: theme.palette.primary.main,
  fontSize: "0.8rem",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#F1F7FF",
  },
}));
