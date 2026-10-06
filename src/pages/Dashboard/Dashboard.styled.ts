import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  padding: "2.5rem",
}));