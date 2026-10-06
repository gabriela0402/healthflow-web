import {
  Box,
  Link,
  Stack,
  styled,
  Typography,
} from "@mui/material";

export const Container = styled(Stack)(({ theme }) => ({
  position: "relative",
  flexDirection: "column",
  minHeight: "100vh",
  width: "100%",
  overflow: "hidden",
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",

  "&::before": {
    content: '""',
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.05,
    top: "-140px",
    left: "-120px",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    border: `35px solid ${theme.palette.primary.main}`,
    opacity: 0.05,
    bottom: "-150px",
    right: "-120px",
  },

  "& > *": {
    position: "relative",
    zIndex: 1,
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: "2.5rem",
  textAlign: "center",

  "@media (max-width: 600px)": {
    fontSize: "1.8rem",
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.5rem",
  textAlign: "center",

  "@media (max-width: 600px)": {
    fontSize: "1.1rem",
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "1.2rem",
}));

export const Illustration = styled("img")({
  margin: "1.7rem",
  width: "180px",
  height: "auto",
  objectFit: "contain",
});

export const OrContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  width: "100%",
});

export const OrLine = styled(Box)(({ theme }) => ({
  flex: 1,
  height: "1px",
  backgroundColor: theme.palette.divider,
}));

export const CreateAccountContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "1.2rem",
  borderRadius: "0.8rem",
  backgroundColor: "#F8FBFF",
  border: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",
}));

export const CreateAccountLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textDecoration: "none",
  marginLeft: "0.25rem",
  cursor: "pointer",

  "&:hover": {
    textDecoration: "underline",
  },
}));
