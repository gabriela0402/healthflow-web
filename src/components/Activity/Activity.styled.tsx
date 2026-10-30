import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const Container = styled(Stack)({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.5rem 1rem",
  padding: "0.5rem 0",
  borderBottom: "1px solid #00000013",
  transition: "transform 0.2s ease-in-out",

  "&:hover": {
    transform: "scale(1.01)",
  },
});

export const Info = styled(Stack)({
  flex: "1 1 14rem",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  minWidth: 0,
});

export const IconWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: "0.75rem",
  borderRadius: "50%",
  backgroundColor: "#f8f9fa",
});

export const Text = styled(Stack)({
  justifyContent: "center",
  minWidth: 0,
});

export const Time = styled(Box)({
  flexShrink: 0,
  whiteSpace: "nowrap",
});