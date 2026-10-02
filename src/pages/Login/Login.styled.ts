import { Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

export const Container = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    backgrouundColor: theme.palette.background.default,
    alignItems: "center",
    justifyContent: "center",
    
}))

export const Title = styled(Typography) (({theme}) => ({
    color: theme.palette.text.primary,
    fontWeight: "800",
    fontSize: "2.5rem"
}))

export const Subtitle = styled(Typography) (({theme}) => ({
    color: theme.palette.text.secondary,
    fontSize: "1.5rem",
}))

export const Text = styled(Typography) (({theme}) => ({
    color: theme.palette.text.primary,
    fontSize: "1.2rem"
}))