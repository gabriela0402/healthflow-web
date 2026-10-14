import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const Content = styled(Stack)({
  gap: "0.8rem",
  paddingTop: "0.5rem",
});

export const Actions = styled(Stack)({
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "0.75rem",

  "@media (max-width: 500px)": {
    flexDirection: "column-reverse",

    "& > *": {
      width: "100%",
    },
  },
});
