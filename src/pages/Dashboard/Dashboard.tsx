import React from 'react'
import { SideBar } from '../../components/SideBar/SideBar'
import { Box, Stack, Typography } from '@mui/material'
import * as Styled from "./Dashboard.styled";

export const Dashboard = () => {
  return (
    <Stack direction={"row"}>
      <SideBar />
      <Styled.Container>
        <Stack spacing={1.4}>
          <Typography variant='h1'>Bem vindo(a), Gabriela</Typography>
          <Typography variant='body1'>Aqui é o que ocorre na sua clínica atualmente</Typography>
        </Stack>
      </Styled.Container>
    </Stack>
    
  )
}

