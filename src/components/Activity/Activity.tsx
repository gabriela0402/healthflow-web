import { Typography } from "@mui/material";
import * as Styled from "./Activity.styled";

import type { ActivityProps } from "./Activity.types";

export const Activity = ({
  icon: Icon,
  title,
  description,
  time,
}: ActivityProps) => {
  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.IconWrapper>
          <Icon sx={{ fontSize: "1.75rem", color: "#348ad1" }} />
        </Styled.IconWrapper>

        <Styled.Text>
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", overflowWrap: "anywhere" }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "grey",
              overflowWrap: "anywhere",
            }}
          >
            {description}
          </Typography>
        </Styled.Text>
      </Styled.Info>

      <Styled.Time>
        <Typography sx={{ fontSize: "0.8rem", color: "grey" }}>
          {time}
        </Typography>
      </Styled.Time>
    </Styled.Container>
  );
};