import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

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

export const Header = styled(Stack)({
  gap: "0.3rem",
});

export const TabsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  marginTop: "2rem",
  overflowX: "auto",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",

  "&::-webkit-scrollbar": {
    height: "4px",
  },

  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#CBD5E1",
    borderRadius: "1rem",
  },
}));

export const TabButton = styled("button")<{
  active?: boolean;
}>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  flex: 1,
  minWidth: "170px",
  height: "58px",
  padding: "0 1rem",
  border: "none",
  borderRadius: "0.6rem",
  backgroundColor: active ? "#EAF3FF" : "transparent",
  color: active
    ? theme.palette.primary.main
    : theme.palette.text.secondary,
  fontFamily: "inherit",
  fontSize: "0.85rem",
  fontWeight: active ? 600 : 400,
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#F1F6FC",
    color: theme.palette.primary.main,
  },
}));

export const ContentCard = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginTop: "1rem",
  padding: "1.5rem",
  boxSizing: "border-box",
  gap: "1.5rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
}));

export const FormGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1.25rem",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const FieldContainer = styled(Stack)({
  gap: "0.4rem",
});

export const Actions = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "0.75rem",
  marginTop: "0.5rem",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",

    "& > *": {
      width: "100%",
    },
  },
}));

export const PreferenceItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "1rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const PreferenceText = styled(Stack)({
  gap: "0.25rem",
});
