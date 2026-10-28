import styled from "@emotion/styled";
import { Box, Stack, TableCell, TableRow } from "@mui/material";
import type { AppointmentStatus } from "./ProfessionalAppointments.types";


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

export const HeaderContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export const FiltersContainer = styled(Stack)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr auto",
  width: "100%",
  gap: "0.7rem",
  marginTop: "1.5rem",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  height: "42px",
  padding: "0 0.8rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.55rem",
  backgroundColor: theme.palette.background.paper,
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  minWidth: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  fontSize: "0.8rem",

  "&::placeholder": {
    color: theme.palette.text.secondary,
  },
}));

export const FilterSelect = styled("select")(({ theme }) => ({
  width: "100%",
  height: "42px",
  padding: "0 0.7rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.55rem",
  outline: "none",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  fontSize: "0.8rem",
  cursor: "pointer",
}));

export const ViewButtons = styled(Stack)({
  flexDirection: "row",
  gap: "0.35rem",
  height: "42px",
});

export const ViewButton = styled("button")<{
  active?: boolean;
}>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0 0.8rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.55rem",
  backgroundColor: active
    ? "#EAF3FF"
    : theme.palette.background.paper,
  color: active
    ? theme.palette.primary.main
    : theme.palette.text.secondary,
  fontFamily: "inherit",
  fontSize: "0.78rem",
  cursor: "pointer",
}));

export const MainContent = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "1rem",
  width: "100%",
  marginTop: "1rem",

  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

export const ScheduleCard = styled(Stack)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  width: "100%",
  padding: "1rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const ScheduleHeader = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  marginBottom: "0.8rem",
});

export const TableWrapper = styled(Box)({
  width: "100%",
  overflowX: "auto",
});

export const StyledTableRow = styled(TableRow)({
  "&:last-child td": {
    borderBottom: 0,
  },
});

export const PatientCell = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.6rem",
  minWidth: "180px",
});

export const Avatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "0.65rem",
  fontWeight: 700,
}));

export const Status = styled(Box)<{ status: AppointmentStatus }>(({ status }) => {
  const colors: Record<AppointmentStatus, { background: string; color: string }> = {
    scheduled: { background: "#EAF3FF", color: "#1976D2" },
    confirmed: { background: "#E7F7EF", color: "#219653" },
    cancelled: { background: "#FDECEC", color: "#D64545" },
    completed: { background: "#F1F1F5", color: "#5F6B7A" },
    noShow: { background: "#FFF4E5", color: "#C77700" },
  };

  return {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    width: "fit-content",
    padding: "0.3rem 0.6rem",
    borderRadius: "1rem",
    backgroundColor: colors[status].background,
    color: colors[status].color,
    fontSize: "0.68rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  };
});

export const filterSx = {
  width: "100%",
  "& .MuiInputBase-root": {
    height: "42px",
    borderRadius: "0.55rem",
    backgroundColor: "background.paper",
    fontSize: "0.8rem",
  },
};

export const SummaryColumn = styled(Stack)(({ theme }) => ({
  width: "260px",
  flexShrink: 0,
  gap: "1rem",

  [theme.breakpoints.down("lg")]: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    width: "100%",
  },

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

export const SummaryCard = styled(Stack)(({ theme }) => ({
  gap: "0.6rem",
  padding: "1rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const SummaryItem = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.7rem",
  padding: "0.75rem",
  borderRadius: "0.5rem",
});

export const SummaryNumber = styled("span")({
  fontSize: "1.4rem",
  fontWeight: 700,
});

export const CalendarWrapper = styled(Box)({
  width: "100%",
  overflowX: "auto",
});

export const CalendarGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns:
    "70px repeat(5, minmax(150px, 1fr))",
  minWidth: "820px",
  borderTop: `1px solid ${theme.palette.divider}`,
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

export const CalendarTimeColumn = styled(Stack)(
  ({ theme }) => ({
    paddingTop: "64px",
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
);

export const CalendarTime = styled(Box)(({ theme }) => ({
  height: "84px",
  padding: "0.6rem 0.35rem",
  boxSizing: "border-box",
  borderBottom: `1px dashed ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
  textAlign: "center",
}));

export const CalendarDayColumn = styled(Stack)(
  ({ theme }) => ({
    minWidth: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#FFFFFF",
  }),
);

export const CalendarDayHeader = styled(Stack)(
  ({ theme }) => ({
    height: "64px",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.2rem",
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#F8FBFF",
  }),
);

export const CalendarDayName = styled("span")({
  fontSize: "0.8rem",
  fontWeight: 700,
});

export const CalendarDayDate = styled("span")(
  ({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "0.68rem",
  }),
);

export const CalendarAppointments = styled(Stack)(
  ({ theme }) => ({
    minHeight: "672px",
    gap: "0.6rem",
    padding: "0.75rem 0.5rem",
    boxSizing: "border-box",
    backgroundImage: `repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 83px,
      ${theme.palette.divider} 84px
    )`,
  }),
);

export const CalendarAppointment = styled(Stack)(
  ({ theme }) => ({
    gap: "0.2rem",
    padding: "0.55rem",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.5rem",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 2px 7px rgba(40, 70, 100, 0.06)",
  }),
);

export const CalendarAppointmentTime = styled("span")({
  fontSize: "0.7rem",
  fontWeight: 700,
});

export const CalendarAppointmentPatient = styled("span")({
  overflow: "hidden",
  color: "#102A56",
  fontSize: "0.7rem",
  fontWeight: 600,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const CalendarAppointmentSpecialty = styled("span")(
  ({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "0.62rem",
  }),
);

export const CalendarEmpty = styled(Box)(({ theme }) => ({
  paddingTop: "2rem",
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
  textAlign: "center",
}));
