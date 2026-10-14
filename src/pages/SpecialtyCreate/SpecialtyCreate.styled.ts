import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  width: "calc(100% - 200px)",
  marginLeft: "250px",
  padding: "2.5rem",
  boxSizing: "border-box",
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    padding: "5rem 1rem 2rem",
  },
}));

export const Header = styled(Stack)({
  gap: "0.3rem",
});

export const FormCard = styled(Stack)(({ theme }) => ({
  gap: "1.2rem",
  width: "100%",
  marginTop: "1.5rem",
  padding: "1.5rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const FormGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1rem",
});

export const Field = styled(Stack)({
  gap: "0.4rem",
});

export const Actions = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "0.75rem",

  "@media (max-width: 600px)": {
    flexDirection: "column-reverse",

    "& > *": {
      width: "100%",
    },
  },
});
