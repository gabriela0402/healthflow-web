import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";

export const SpecialtyList = styled(Stack)({
  gap: "0.75rem",
  marginTop: "1rem",
});

export const SpecialtyItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  padding: "0.85rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.6rem",
  backgroundColor: "#FFFFFF",
}));

export const SpecialtyIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2.5rem",
  height: "2.5rem",
  flexShrink: 0,
  borderRadius: "50%",
  backgroundColor: "#EAF3FF",
  color: theme.palette.primary.main,
}));

export const SpecialtyContent = styled(Stack)({
  flex: 1,
  minWidth: 0,
});
