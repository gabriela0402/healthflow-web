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

export const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  gap: "1rem",
  marginTop: "1.5rem",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
}));

export const NotificationCard = styled(Stack)(({ theme }) => ({
  minWidth: 0,
  gap: "1rem",
  padding: "1.2rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.down("sm")]: {
    padding: "0.75rem",
  },
}));

export const NotificationItem = styled(Stack)<{
  read?: boolean;
}>(({ theme, read }) => ({
  position: "relative",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "0.8rem",
  padding: "1rem 1rem 1rem 1.4rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  backgroundColor: read ? "#FFFFFF" : "#F8FBFF",

  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    gap: "0.6rem",
    padding: "0.75rem 0.75rem 0.75rem 1.1rem",
  },
}));

export const UnreadDot = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "0.45rem",
  width: "0.55rem",
  height: "0.55rem",
  transform: "translateY(-50%)",
  borderRadius: "50%",
  backgroundColor: "#1976D2",
});

export const NotificationIcon = styled(Box)<{
  type: "appointment" | "reminder" | "system";
}>(({ theme, type }) => ({
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

  [theme.breakpoints.down("sm")]: {
    width: "2.2rem",
    height: "2.2rem",

    "& svg": {
      fontSize: "1.2rem",
    },
  },
}));

export const NotificationBody = styled(Stack)({
  flex: 1,
  minWidth: 0,
  gap: "0.25rem",

  "& > p": {
    overflowWrap: "break-word",
  },
});

export const NotificationDate = styled(Stack)(({ theme }) => ({
  alignItems: "flex-end",
  flexShrink: 0,
  minWidth: "5.5rem",
  whiteSpace: "nowrap",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "0.1rem 0.6rem",
    flexBasis: "100%",
    minWidth: 0,
    whiteSpace: "normal",
    paddingLeft: "2.8rem",
    boxSizing: "border-box",
  },
}));

export const MarkReadButton = styled("button")(({ theme }) => ({
  alignSelf: "flex-start",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  fontFamily: "inherit",
  fontSize: "0.72rem",
  textAlign: "left",
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
}));

export const PreferencesCard = styled(Stack)(({ theme }) => ({
  minWidth: 0,
  gap: "0.8rem",
  alignSelf: "flex-start",
  padding: "1.2rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.down("lg")]: {
    alignSelf: "stretch",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "0.75rem",
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

  "& .MuiSwitch-root": {
    flexShrink: 0,
  },

  [theme.breakpoints.down("sm")]: {
    gap: "0.5rem",
  },
}));

export const PreferenceInfo = styled(Stack)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",

  "& > svg": {
    flexShrink: 0,
  },

  "& p": {
    overflowWrap: "break-word",
  },

  [theme.breakpoints.down("sm")]: {
    gap: "0.6rem",
  },
}));