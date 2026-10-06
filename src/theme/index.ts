import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
    },
    secondary: {
      main: "#26A69A",
    },
    background: {
      default: "#F4F7FB",
      paper: "#FFFFFF",
    }, 
    text: {
      primary: "#172033",
      secondary: "#667085",
    },
    success: {
      main: "#2E9B68",
    },
    warning: {
      main: "#E9A23B",
    },
    error: {
      main: "#D64545",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});
