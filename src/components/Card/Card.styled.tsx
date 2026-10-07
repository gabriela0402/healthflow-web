import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  width: "24%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "0.7rem",
  border: "0.1rem solid #00000011",
  padding: "0 1rem 0 0",

  
}));