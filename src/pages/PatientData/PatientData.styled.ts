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

export const Card = styled(Stack)(({ theme }) => ({
  gap: "1.2rem",
  width: "100%",
  marginTop: "1.5rem",
  padding: "1.25rem",
  boxSizing: "border-box",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.7rem",
  backgroundColor: theme.palette.background.paper,
}));

export const ProfileHeader = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
});

export const Avatar = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "5rem",
  height: "5rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
  fontSize: "1.4rem",
  fontWeight: 700,
}));

export const FormGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",

  "@media (max-width: 650px)": {
    gridTemplateColumns: "1fr",
  },
});

export const Field = styled(Stack)({
  gap: "0.4rem",
});

export const FullWidthField = styled(Field)({
  gridColumn: "1 / -1",
});

export const Actions = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "0.75rem",

  "@media (max-width: 600px)": {
    flexDirection: "column-reverse",

    "& > button": {
      width: "100%",
    },
  },
});
