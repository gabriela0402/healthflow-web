import styled from "@emotion/styled";
import { Box, Stack, Button } from "@mui/material";

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

export const ProfileCard = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginTop: "1.5rem",
  padding: "1.25rem",
  boxSizing: "border-box",
  gap: "1.25rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
}));

export const ProfileHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    alignItems: "flex-start",
  },
}));

export const Avatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "4.5rem",
  height: "4.5rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "1.35rem",
  fontWeight: 700,
}));

export const ProfileInfo = styled(Stack)({
  gap: "0.2rem",
});

export const FormGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const Field = styled(Stack)({
  gap: "0.4rem",
});

export const Actions = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "0.75rem",
  marginTop: "0.25rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    alignItems: "stretch",

    "& > *": {
      width: "100%",
    },
  },
}));

export const AvailabilityCard = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginTop: "1rem",
  padding: "1.25rem",
  boxSizing: "border-box",
  gap: "1rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
}));

export const AvailabilityGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: "2rem",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const AvailabilityItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "3rem",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const DayLabel = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.6rem",
});

export const DayIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

export const AvailabilityHeader = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const ManageButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexShrink: 0,
  marginLeft: "auto",
  padding: "0.5rem 1.1rem",
  borderRadius: "0.55rem",
  backgroundColor: theme.palette.primary.main,
  color: "#FFFFFF",
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "none",
  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: "#1769AA",
  },

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    width: "100%",
  },
}));
