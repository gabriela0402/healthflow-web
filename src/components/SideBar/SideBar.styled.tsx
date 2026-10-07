import { Box, IconButton, ListItemButton, styled } from "@mui/material";

export const Container = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1200,

  display: "flex",
  flexDirection: "column",

  width: "250px",
  height: "100vh",
  padding: "1.5rem 1rem",

  backgroundColor: theme.palette.background.paper,
  borderRight: `1px solid ${theme.palette.divider}`,
  boxSizing: "border-box",

  [theme.breakpoints.down("sm")]: {
    width: "280px",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease",
    boxShadow: "none",

    "&.open": {
      transform: "translateX(0)",
      boxShadow: "6px 0 24px rgba(0, 0, 0, 0.12)",
    },
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  position: "fixed",
  top: "1rem",
  left: "1rem",
  zIndex: 1300,
  width: "42px",
  height: "42px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.12)",

  "&:hover": {
    backgroundColor: "#EAF3FF",
  },

  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));


export const Overlay = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    inset: 0,
    zIndex: 1100,
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
}));

export const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "56px",
  marginBottom: "2rem",

  [theme.breakpoints.down("sm")]: {
    marginBottom: "1.5rem",
  },
}));

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
    textDecoration: "none",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: "#EAF3FF",
      color: theme.palette.primary.main,
    },

    "&.active": {
      backgroundColor: "#EAF3FF",
      color: theme.palette.primary.main,
      fontWeight: 600,
    },

    "& .MuiSvgIcon-root": {
      flexShrink: 0,
      fontSize: "1.25rem",
      marginRight: "0.75rem",
    },

    "& .MuiListItemText-primary": {
      fontSize: "0.9rem",
      fontWeight: "inherit",
    },

    [theme.breakpoints.down("sm")]: {
      minHeight: "46px",
      justifyContent: "flex-start",
      padding: "0.7rem 1rem",

      "& .MuiSvgIcon-root": {
        marginRight: "0.9rem",
      },

      "& .MuiListItemText-root": {
        display: "block",
      },
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
