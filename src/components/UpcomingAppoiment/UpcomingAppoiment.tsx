import { Stack, Typography } from "@mui/material";
import React from "react";
import * as Styled from "./UpcomingAppoiment.styled";
import type { UpcomingAppoimentProps } from "./UpcomingAppoiment.types";

export const UpcomingAppoiment = ({
  time,
  name,
  job,
  status
}: UpcomingAppoimentProps) => {
  return (
    <Styled.Container>
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <Styled.Time>
          <Typography>{time}</Typography>
        </Styled.Time>

        <Stack>
          <Typography sx={{ fontWeight: "600" }}>{name}</Typography>
          <Typography sx={{ fontSize: "0.8rem" }}>{job}</Typography>
        </Stack>
      </Stack>
      <Styled.Status status={status}>
        <Typography sx={{ fontWeight: "600", fontSize: "0.9rem" }}>
          {status}
        </Typography>
      </Styled.Status>
    </Styled.Container>
  );
};
