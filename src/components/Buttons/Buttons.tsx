import { Button } from "@mui/material";
import { theme } from "../../theme";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export const ButtonBlue = ({ text, onClick }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: "100%",
        height: "50px",
        textTransform: "none",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "0.6rem",
        boxShadow: "none",

        "&:hover": {
          backgroundColor: "#2266C5",
          opacity: 0.9,
          boxShadow: "none",
        },

        [theme.breakpoints.down("md")]: {
          width:"50%"
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
        textTransform: "none",
        backgroundColor: "#FFFFFF",
        color: theme.palette.text.primary,
        borderColor: theme.palette.divider,
        borderRadius: "0.6rem",
        boxShadow: "none",

        "&:hover": {
          backgroundColor: "#F1F6FC",
          borderColor: theme.palette.primary.main,
          boxShadow: "none",
        },

        [theme.breakpoints.down("md")]: {
          width:"50%"
        },
      }}
    >
      {text}
    </Button>
  );
};
