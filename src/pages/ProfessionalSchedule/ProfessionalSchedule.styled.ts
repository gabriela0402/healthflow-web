import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  width: "calc(100% - 250px)",
  marginLeft: "250px",
  padding: "2rem 2.5rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    padding: "5rem 1rem 2rem",
  },
}));

export const Header = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const HeaderActions = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.75rem",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const WeekSelector = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  height: "44px",
  padding: "0 0.75rem",
  gap: "0.6rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
}));


export const MainContent = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "1rem",
  width: "100%",
  marginTop: "1.5rem",

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export const CalendarCard = styled(Stack)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  width: "100%",
  padding: "1rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  overflow: "hidden",
}));

export const CalendarGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "48px repeat(5, minmax(145px, 1fr))",
  width: "100%",
  minWidth: "820px",
  borderTop: `1px solid ${theme.palette.divider}`,
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

export const CalendarScroll = styled(Box)({
  width: "100%",
  overflowX: "auto",
});

export const TimeColumn = styled(Stack)(({ theme }) => ({
  paddingTop: "76px",
  borderRight: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",
}));


export const TimeLabel = styled(Box)(({ theme }) => ({
  height: "92px",
  padding: "0.65rem 0.35rem 0",
  boxSizing: "border-box",
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
  textAlign: "center",
  borderBottom: `1px dashed ${theme.palette.divider}`,
}));


export const DayColumn = styled(Stack)<{ active?: boolean }>(
  ({ theme, active }) => ({
    minWidth: 0,
    backgroundColor: active ? "#F4F9FF" : "#FFFFFF",
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
);

export const DayHeader = styled(Stack)<{ active?: boolean }>(
  ({ theme, active }) => ({
    height: "76px",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: active
      ? `3px solid ${theme.palette.primary.main}`
      : "3px solid transparent",
    color: active
      ? theme.palette.primary.main
      : theme.palette.text.primary,
  }),
);

export const DayName = styled("span")({
  fontSize: "0.85rem",
  fontWeight: 700,
});

export const DayDate = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
}));

export const DayAppointments = styled(Stack)(({ theme }) => ({
  position: "relative",
  minHeight: "828px",
  padding: "0 0.55rem",
  boxSizing: "border-box",

  backgroundImage:
    "repeating-linear-gradient(" +
    "to bottom, " +
    "transparent 0, " +
    "transparent 91px, " +
    "#e5eaf0 92px" +
    ")",
}));

export const AppointmentCard = styled(Stack)(
  ({ theme }) => ({
    position: "absolute",
    left: "0.55rem",
    right: "0.55rem",
    minHeight: "86px",
    padding: "0.5rem",
    boxSizing: "border-box",
    gap: "0.15rem",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.6rem",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 8px rgba(40, 70, 100, 0.05)",
  }),
);



export const AppointmentTop = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",
});

export const Avatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "0.62rem",
  fontWeight: 700,
}));

export const AppointmentTime = styled("span")({
  fontSize: "0.72rem",
  fontWeight: 700,
});

export const PatientName = styled("span")({
  overflow: "hidden",
  color: "#172B4D",
  fontSize: "0.72rem",
  fontWeight: 600,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const Specialty = styled("span")(({ theme }) => ({
  paddingLeft: "36px",
  color: theme.palette.text.secondary,
  fontSize: "0.65rem",
}));

export const Status = styled(Box)<{
  status: "confirmed" | "pending" | "completed";
}>(({ status }) => {
  const colors = {
    confirmed: {
      background: "#E7F7EF",
      color: "#219653",
    },
    pending: {
      background: "#FFF5DD",
      color: "#D99400",
    },
    completed: {
      background: "#EEF0F3",
      color: "#667085",
    },
  };

  return {
    alignSelf: "flex-start",
    marginTop: "0.25rem",
    marginLeft: "36px",
    padding: "0.2rem 0.45rem",
    borderRadius: "1rem",
    backgroundColor: colors[status].background,
    color: colors[status].color,
    fontSize: "0.6rem",
    fontWeight: 600,
  };
});

export const EmptyDay = styled(Box)(({ theme }) => ({
  paddingTop: "2rem",
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
  textAlign: "center",
}));

export const SummaryColumn = styled(Stack)(({ theme }) => ({
  width: "300px",
  flexShrink: 0,
  gap: "1rem",

  [theme.breakpoints.down("lg")]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    width: "100%",
  },

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

export const SummaryCard = styled(Stack)(({ theme }) => ({
  gap: "0.8rem",
  padding: "1.25rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
}));

export const SummaryHeader = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
});

export const SummaryItem = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem",
  borderRadius: "0.5rem",
});

export const SummaryNumber = styled("span")({
  fontSize: "1.3rem",
  fontWeight: 700,
});

export const UpcomingItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  padding: "0.75rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const UpcomingTime = styled("span")(({ theme }) => ({
  minWidth: "42px",
  color: theme.palette.text.secondary,
  fontSize: "0.72rem",
  fontWeight: 600,
}));

export const UpcomingStatus = styled(Box)<{
  status: "confirmed" | "pending";
}>(({ status }) => ({
  padding: "0.25rem 0.4rem",
  borderRadius: "1rem",
  backgroundColor:
    status === "confirmed" ? "#E7F7EF" : "#FFF5DD",
  color: status === "confirmed" ? "#219653" : "#D99400",
  fontSize: "0.6rem",
  fontWeight: 600,
  whiteSpace: "nowrap",
}));
