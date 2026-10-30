import { Stack, Typography } from "@mui/material";
import * as Styled from "./UpcomingAppoiment.styled";
import type { UpcomingAppoimentProps } from "./UpcomingAppoiment.types";

export const UpcomingAppoiment = ({
  time,
  name,
  job,
  status,
}: UpcomingAppoimentProps) => {
  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.Time>
          <Typography>{time}</Typography>
        </Styled.Time>

        <Stack sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 600, overflowWrap: "anywhere" }}>
            {name}
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", overflowWrap: "anywhere" }}>
            {job}
          </Typography>
        </Stack>
      </Styled.Info>

      <Styled.Status status={status}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
          {status}
        </Typography>
      </Styled.Status>
    </Styled.Container>
  );
};