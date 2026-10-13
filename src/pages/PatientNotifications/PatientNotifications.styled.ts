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

export const Header = styled(Stack)({
  gap: "0.3rem",
});

export const ContentGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  gap: "1rem",
  marginTop: "1.5rem",

  "@media (max-width: 900px)": {
    gridTemplateColumns: "1fr",
  },
});

export const NotificationCard = styled(Stack)(({ theme }) => ({
  gap: "1rem",
  padding: "1.2rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const NotificationItem = styled(Stack)<{
  read?: boolean;
}>(({ theme, read }) => ({
  position: "relative",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "0.8rem",
  padding: "1rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  backgroundColor: read ? "#FFFFFF" : "#F8FBFF",
}));

export const UnreadDot = styled(Box)({
  width: "0.55rem",
  height: "0.55rem",
  flexShrink: 0,
  marginTop: "0.65rem",
  borderRadius: "50%",
  backgroundColor: "#1976D2",
});

export const NotificationIcon = styled(Box)<{
  type: "appointment" | "reminder" | "system";
}>(({ type }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.8rem",
  height: "2.8rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor:
    type === "reminder"
      ? "#E7F7EF"
      : type === "system"
        ? "#FFF5DD"
        : "#EAF3FF",
  color:
    type === "reminder"
      ? "#219653"
      : type === "system"
        ? "#D99400"
        : "#1976D2",
}));

export const NotificationBody = styled(Stack)({
  flex: 1,
  minWidth: 0,
  gap: "0.25rem",
});

export const MarkReadButton = styled("button")(({ theme }) => ({
  alignSelf: "flex-start",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  fontFamily: "inherit",
  fontSize: "0.72rem",
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const PreferencesCard = styled(Stack)(({ theme }) => ({
  gap: "0.8rem",
  alignSelf: "flex-start",
  padding: "1.2rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,

  "@media (max-width: 900px)": {
    width: "100%",
    boxSizing: "border-box",
  },
}));

export const PreferenceItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "0.9rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));
