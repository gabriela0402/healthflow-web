import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const FormContainer = styled(Stack)({
  gap: "1rem",
  paddingTop: "0.5rem",
});

export const TimeContainer = styled(Stack)({
  flexDirection: "row",
  gap: "1rem",

  "@media (max-width: 600px)": {
    flexDirection: "column",
  },
});
