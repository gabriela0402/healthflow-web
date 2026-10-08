import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import * as Styled from "./Activity.styled";

import type { ActivityProps } from "./Activity.types";

export const Activity = ({
  icon: Icon,
  title,
  description,
  time,
}: ActivityProps) => {
  return (
    <Styled.Container
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #00000013",
      }}
    >
      <Stack sx={{ flexDirection: "row" }}>
        <Box
          sx={{
            padding: "1rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "2.5rem",
            margin: "1rem"
          }}
        >
          <Icon
            sx={{
              fontSize: "2rem",
              color: "#348ad1",
            }}
          />
        </Box>
        <Stack sx={{justifyContent:"center"}}>
          <Stack>
            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
              {title}
            </Typography>
          </Stack>
          <Stack>
            <Typography sx={{ fontSize: "0.9rem", color: "grey" }}>{description}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Box>
        <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
          {time}
        </Typography>
      </Box>
    </Styled.Container>
  );
};
