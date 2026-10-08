import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: "2.5rem",
  marginLeft: "250px",
  width: "calc(100% - 250px)",
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    width: "100%",
    padding: "5rem 1rem 2rem",
  },
}));

export const TitleContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FiltersContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  gap: "0.75rem",
  marginTop: "2rem",

  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flex: 1,
  minWidth: "220px",
  height: "44px",
  padding: "0 0.85rem",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  boxSizing: "border-box",
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
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
  flex: 1,
  minWidth: "150px",
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


export const MoreFiltersButton = styled("button")(
  ({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    height: "44px",
    padding: "0 1rem",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "0.6rem",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontFamily: "inherit",
    fontSize: "0.85rem",
    cursor: "pointer",
    whiteSpace: "nowrap",

    "&:hover": {
      backgroundColor: "#F1F6FC",
    },

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }),
);
