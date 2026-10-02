import { Stack } from "@mui/material"
import { styled } from "@mui/material/styles"

export const Container = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    minHeight: "100vh",
    width: "100%",
    backgrouundColor: "red",
}))