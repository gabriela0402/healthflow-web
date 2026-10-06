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
  boxSizing: "border-box",
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

    [theme.breakpoints.down("sm")]: {
      width: "200px",
      height: "200px",
      top: "-90px",
      left: "-90px",
    },
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

    [theme.breakpoints.down("sm")]: {
      width: "180px",
      height: "180px",
      borderWidth: "22px",
      bottom: "-100px",
      right: "-90px",
    },
  },

  "& > *": {
    position: "relative",
    zIndex: 1,
  },

  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
    padding: "1.5rem 1rem",
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
  lineHeight: 1.2,
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "320px",
  },
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "clamp(1.05rem, 3vw, 1.5rem)",
  textAlign: "center",
  marginTop: "0.5rem",
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "clamp(1rem, 2vw, 1.2rem)",
}));

export const Illustration = styled("img")(({ theme }) => ({
  margin: "1.7rem",
  width: "180px",
  height: "auto",
  objectFit: "contain",

  [theme.breakpoints.down("sm")]: {
    width: "145px",
    margin: "1rem",
  },
}));

export const OrContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
  width: "100%",

  [theme.breakpoints.down("sm")]: {
    gap: "0.75rem",
  },
}));

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
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    padding: "1rem 0.75rem",
  },
}));

export const CreateAccountLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  textDecoration: "none",
  marginLeft: "0.25rem",
  cursor: "pointer",
  whiteSpace: "nowrap",

  "&:hover": {
    textDecoration: "underline",
  },
}));
