import styled from "@emotion/styled";
import { Box, Button, Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  minWidth: 0,
  padding: "1rem",
  gap: "0.9rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  transition: "transform 0.2s ease-in-out",
  
  "&:hover": {
    transform: "translateY(-3px)",
  },
}));

export const Header = styled(Stack)({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "0.8rem",
});

export const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "3rem",
  height: "3rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
}));

export const Description = styled("p")(({ theme }) => ({
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  lineHeight: 1.4,
}));

export const Statistics = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "1rem",
  paddingTop: "0.75rem",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const Statistic = styled(Stack)({
  flex: 1,
  minWidth: 0,
});

export const StatisticTitle = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
}));

export const StatisticValue = styled("strong")({
  fontSize: "1.1rem",
});

export const Growth = styled("span")({
  color: "#219653",
  fontSize: "0.7rem",
});

export const DetailsButton = styled(Button)(({ theme }) => ({
  justifyContent: "space-between",
  width: "100%",
  minHeight: "34px",
  padding: "0.35rem 0.75rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.5rem",
  color: theme.palette.primary.main,
  textTransform: "none",
  boxShadow: "none",

  "&:hover": {
    backgroundColor: "#F1F6FC",
    boxShadow: "none",
  },
}));
