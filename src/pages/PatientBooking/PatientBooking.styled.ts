import styled from "@emotion/styled";
import { Box, Button, Stack } from "@mui/material";

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

export const Stepper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginTop: "1.5rem",
  padding: "1rem 1.25rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
  boxSizing: "border-box",
  overflowX: "auto",
}));

export const Step = styled(Stack)<{
  active?: boolean;
  completed?: boolean;
}>(({ theme, active, completed }) => ({
  position: "relative",
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  gap: "0.6rem",
  minWidth: "160px",
  color: active || completed
    ? theme.palette.primary.main
    : theme.palette.text.secondary,

  "&::after": {
    content: '""',
    flex: 1,
    height: "1px",
    margin: "0 0.5rem",
    backgroundColor: completed
      ? theme.palette.primary.main
      : theme.palette.divider,
  },

  "&:last-child::after": {
    display: "none",
  },
}));

export const StepNumber = styled(Box)<{
  active?: boolean;
}>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: active
    ? theme.palette.primary.main
    : "#F1F4F8",
  color: active ? "#FFFFFF" : theme.palette.text.secondary,
  fontSize: "0.8rem",
  fontWeight: 700,
}));

export const ContentGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)",
  gap: "1rem",
  width: "100%",
  marginTop: "1rem",

  "@media (max-width: 900px)": {
    gridTemplateColumns: "1fr",
  },
});

export const MainCard = styled(Stack)(({ theme }) => ({
  minWidth: 0,
  padding: "1.25rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "44px",
  marginTop: "1rem",
  padding: "0 1rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.55rem",
  outline: "none",
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  fontSize: "0.8rem",

  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
}));

export const SpecialtyGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.8rem",
  marginTop: "1rem",

  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

export const SpecialtyCard = styled(Button)<{
  selected?: boolean;
}>(({ theme, selected }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  minHeight: "110px",
  padding: "1rem",
  border: `1px solid ${
    selected
      ? theme.palette.primary.main
      : theme.palette.divider
  }`,
  borderRadius: "0.6rem",
  backgroundColor: selected ? "#F0F7FF" : "#FFFFFF",
  color: theme.palette.text.primary,
  textAlign: "left",
  textTransform: "none",

  "&:hover": {
    backgroundColor: "#F0F7FF",
    borderColor: theme.palette.primary.main,
  },
}));

export const SelectionIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.8rem",
  height: "2.8rem",
  flexShrink: 0,
  marginRight: "0.8rem",
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
}));

export const ProfessionalList = styled(Stack)({
  gap: "0.8rem",
  marginTop: "1rem",
});

export const ProfessionalCard = styled(Button)<{
  selected?: boolean;
}>(({ theme, selected }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "0.8rem",
  minHeight: "74px",
  padding: "0.8rem",
  border: `1px solid ${
    selected
      ? theme.palette.primary.main
      : theme.palette.divider
  }`,
  borderRadius: "0.6rem",
  backgroundColor: selected ? "#F0F7FF" : "#FFFFFF",
  color: theme.palette.text.primary,
  textAlign: "left",
  textTransform: "none",
}));

export const ProfessionalAvatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.8rem",
  height: "2.8rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "0.7rem",
  fontWeight: 700,
}));

export const DateGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "0.8rem",
  marginTop: "1rem",

  "@media (max-width: 600px)": {
    gridTemplateColumns: "1fr",
  },
});

export const DateCard = styled(Button)<{
  selected?: boolean;
}>(({ theme, selected }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0.9rem",
  border: `1px solid ${
    selected
      ? theme.palette.primary.main
      : theme.palette.divider
  }`,
  borderRadius: "0.6rem",
  backgroundColor: selected ? "#F0F7FF" : "#FFFFFF",
  color: theme.palette.text.primary,
  textTransform: "none",
}));

export const TimeGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "0.6rem",
  marginTop: "1rem",

  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
});

export const TimeButton = styled(Button)<{
  selected?: boolean;
}>(({ theme, selected }) => ({
  minHeight: "42px",
  border: `1px solid ${
    selected
      ? theme.palette.primary.main
      : theme.palette.divider
  }`,
  borderRadius: "0.5rem",
  backgroundColor: selected ? "#1976D2" : "#FFFFFF",
  color: selected ? "#FFFFFF" : theme.palette.text.primary,
  fontSize: "0.8rem",
  textTransform: "none",

  "&:hover": {
    backgroundColor: selected ? "#1769AA" : "#F0F7FF",
  },
}));

export const SummaryCard = styled(Stack)(({ theme }) => ({
  alignSelf: "flex-start",
  gap: "1rem",
  padding: "1.25rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,

  [theme.breakpoints.down("md")]: {
    width: "100%",
    boxSizing: "border-box",
  },
}));

export const SummaryItem = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: "0.8rem",
  padding: "0.8rem 0",
  borderBottom: `1px solid ${theme.palette.divider}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const SummaryIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#F1F7FF",
  color: theme.palette.primary.main,
}));

export const FooterActions = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "0.8rem",
  marginTop: "1.5rem",

  "@media (max-width: 600px)": {
    flexDirection: "column-reverse",
  },
});

export const ConfirmationBox = styled(Stack)({
  alignItems: "center",
  gap: "0.8rem",
  padding: "2rem 1rem",
  textAlign: "center",
});

export const ConfirmationIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "4.5rem",
  height: "4.5rem",
  borderRadius: "50%",
  backgroundColor: "#E7F7EF",
  color: "#219653",
}));
