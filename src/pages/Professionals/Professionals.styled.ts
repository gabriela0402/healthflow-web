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

export const TitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FiltersContainer = styled(Stack)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "4fr 4fr 4fr ",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
  marginTop: "2rem",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr 1fr",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "0.65rem",
    marginTop: "1.5rem",
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "100%",
  height: "44px",
  minWidth: 0,
  padding: "0 0.85rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",

  [theme.breakpoints.down("lg")]: {
    gridColumn: "1 / -1",
  },
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

export const FilterSelect = styled("select")(({ theme }) => ({
  width: "100%",
  minWidth: 0,
  height: "44px",
  padding: "0 2.5rem 0 0.75rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  fontFamily: "inherit",
  fontSize: "0.85rem",
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E" )`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.8rem center",
  backgroundSize: "1rem",

  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
}));

export const CardContainer = styled(Stack)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  width: "100%",
  gap: "1rem",
  marginTop: "1rem",

  "& > *": {
    width: "100% !important",
    minWidth: 0,
  },

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "0.75rem",
  },
}));

export const ProfessionalsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
  width: "100%",
  gap: "1rem",
  marginTop: "0.75rem",

  "& > *": {
    width: "100% !important",
    minWidth: 0,
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "0.75rem",
  },
}));