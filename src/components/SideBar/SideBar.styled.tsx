import { Box, ListItemButton, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent:" center",
  width: "250px",
  minHeight: "100vh",
  padding: "1.5rem 1rem",
  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid #1f1e1e1a`,
  boxSizing: "border-box",
}));

export const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "56px",
  marginBottom: "2rem",
});

export const Logo = styled("img")({
  width: "150px",
  height: "auto",
  objectFit: "contain",
});

export const ItemsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
});

export const StyledItemButton = styled(ListItemButton)(
  ({ theme }) => ({
    minHeight: "44px",
    padding: "0.7rem 0.85rem",
    borderRadius: "0.65rem",
    color: theme.palette.text.secondary,
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
    },

    "&.active": {
      backgroundColor: "#EAF3FF",
      color: theme.palette.primary.main,
      fontWeight: 600,
    },

    "& .MuiSvgIcon-root": {
      fontSize: "1.25rem",
      marginRight: "0.75rem",
    },
  }),
);

export const BottomItems = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
  marginTop: "auto",
  paddingTop: "1rem",
  borderTop: `1px solid ${theme.palette.divider}`,
}));
