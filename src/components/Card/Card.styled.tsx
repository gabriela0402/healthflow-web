import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  boxSizing: "border-box",

  width: "calc(25% - 0.75rem)",
  minHeight: "7rem",

  backgroundColor: theme.palette.background.paper,
  borderRadius: "0.7rem",
  border: "0.1rem solid #00000011",
  padding: "0 1rem",

  [theme.breakpoints.down("lg")]: {
    width: "calc(50% - 0.5rem)",
  },

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

