import { Button } from "@mui/material";
import { theme } from "../../theme";
import type { ButtonProps } from "./Buttons.type";

export const ButtonBlue = ({
  text,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: "auto",
        height: "50px",
        minWidth: "200px",
        borderRadius: "0.6rem",
        backgroundColor: theme.palette.primary.main,
        textTransform: "none",

        "&:hover": {
          backgroundColor: "#2266c5",
        },
      }}
    >
      {text}
    </Button>
  );
};

export const ButtonWhite = ({ text, onClick }: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={{
        width: "100%",
        height: "50px",
        borderRadius: "0.6rem",
        color: theme.palette.text.primary,
        textTransform: "none",
      }}
    >
      {text}
    </Button>
  );
};
