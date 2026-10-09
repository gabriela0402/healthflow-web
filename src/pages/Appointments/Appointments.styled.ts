import styled from "@emotion/styled";
import MuiSearchIcon from "@mui/icons-material/Search";
import { Box, Stack, TableRow } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  width: "calc(100% - 250px)",
  marginLeft: "250px",
  padding: "2.5rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    padding: "5rem 1rem 2rem",
  },
}));

export const HeaderContainer = styled(Stack)({
  width: "100%",
});

export const TitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const AddButtonContainer = styled(Stack)(({ theme }) => ({
  width: "190px",
  flexShrink: 0,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const FiltersContainer = styled(Stack)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  width: "100%",
  gap: "0.75rem",
  marginTop: "1.5rem",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const SearchWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "44px",
  gap: "0.5rem",
  padding: "0 0.85rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  backgroundColor: theme.palette.background.paper,
}));

export const SearchIcon = styled(MuiSearchIcon)(({ theme }) => ({
  fontSize: "1.2rem",
  color: theme.palette.text.secondary,
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  minWidth: 0,
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  fontSize: "0.85rem",

  "&::placeholder": {
    color: theme.palette.text.secondary,
  },
}));

export const FilterSelect = styled("select")(
  ({ theme }) => ({
    width: "100%",
    height: "44px",
    padding: "0 0.75rem",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.6rem",
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    fontFamily: "inherit",
    fontSize: "0.85rem",
    cursor: "pointer",

    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  }),
);

export const ContentContainer = styled(Stack)(
  ({ theme }) => ({
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    gap: "1rem",
    marginTop: "1rem",

    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
    },
  }),
);

export const ScheduleContainer = styled(Stack)(
  ({ theme }) => ({
    flex: 1,
    minWidth: 0,
    width: "100%",
    padding: "1.25rem",
    boxSizing: "border-box",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.7rem",
    backgroundColor: theme.palette.background.paper,
  }),
);

export const ScheduleHeader = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "1rem",
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
  minWidth: "170px",
});

export const Avatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.2rem",
  height: "2.2rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "0.7rem",
  fontWeight: 600,
}));

type StatusProps = {
  status:
    | "scheduled"
    | "confirmed"
    | "pending"
    | "cancelled"
    | "completed";
};

export const Status = styled(Box)<StatusProps>(
  ({ status }) => {
    const statusColors = {
      scheduled: {
        background: "#EAF3FF",
        color: "#1976D2",
      },
      confirmed: {
        background: "#E7F7EF",
        color: "#219653",
      },
      pending: {
        background: "#FFF5DD",
        color: "#D99400",
      },
      cancelled: {
        background: "#FDECEC",
        color: "#D64545",
      },
      completed: {
        background: "#EEF0F3",
        color: "#667085",
      },
    };

    return {
      display: "inline-flex",
      width: "fit-content",
      padding: "0.3rem 0.6rem",
      borderRadius: "1rem",
      backgroundColor: statusColors[status].background,
      color: statusColors[status].color,
      fontSize: "0.7rem",
      fontWeight: 600,
      whiteSpace: "nowrap",
    };
  },
);

export const SideSummaryContainer = styled(Stack)(
  ({ theme }) => ({
    width: "280px",
    flexShrink: 0,
    gap: "1rem",

    [theme.breakpoints.down("lg")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      width: "100%",
    },
  }),
);

export const SummaryCard = styled(Stack)(({ theme }) => ({
  gap: "0.75rem",
  padding: "1rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const SummaryCardHeader = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.75rem",
});

export const SummaryItem = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.75rem",
  borderRadius: "0.5rem",
});

export const Donut = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "8rem",
  height: "8rem",
  margin: "1rem auto",
  position: "relative",
  borderRadius: "50%",
  background: `conic-gradient(
    #4CAF91 0% 67%,
    #42A5F5 67% 86%,
    #F4C95D 86% 96%,
    #E57373 96% 100%
  )`,

  "&::before": {
    content: '""',
    position: "absolute",
    width: "5.8rem",
    height: "5.8rem",
    borderRadius: "50%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const DonutValue = styled(Stack)({
  position: "relative",
  zIndex: 1,
  alignItems: "center",
});

export const LegendItem = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.5rem",

  "& p:last-child": {
    marginLeft: "auto",
    fontWeight: 600,
  },
});

export const LegendColor = styled(Box)<{ color: string }>(
  ({ color }) => ({
    width: "0.55rem",
    height: "0.55rem",
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: color,
  }),
);

export const UpcomingItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.65rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));
