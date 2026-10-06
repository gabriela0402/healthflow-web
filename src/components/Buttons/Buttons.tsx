import React from 'react'
import { Button } from '@mui/material';
import { theme } from '../../theme';


export const ButtonBlue = ({text, onClick}) => {
  return (
    <Button
        variant='contained'
        sx={{
            width: "100%",
            height: "50px",
            textTransform: "none",
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: "#2266c5",
                opacity: 0.9
            }
        }}
    >
        {text}
    </Button>
      
  )
}

export const ButtonWhite = ({text, onClick}) => {
  return (
    <Button
        variant='contained'
        sx={{
            width: "100%",
            height: "50px",
            backgroundColor: "#fafafa",
            color: theme.palette.text.primary,
            '&:hover': {
                backgroundColor: "#f1f1f1",
                opacity: 0.9
            }
        }}
    >
        {text}
    </Button>
      
  )
}
