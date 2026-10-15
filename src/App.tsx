import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRoutes } from "./routes/AppRoutes";
import { theme } from "./theme";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}
