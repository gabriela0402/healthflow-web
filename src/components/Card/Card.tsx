import { Stack, Typography } from "@mui/material";
import * as Styled from "./Card.styled";
import type { CardProps } from "./Card.types";

export const Card = ({
  title,
  num,
  icon: Icon,
  type,
}: CardProps) => {
  return (
    <Styled.Container cardType={type}>
      <Stack
        sx={{
          padding: "0.5rem",
          justifyContent: "center",
        }}
      >
        {Icon && (
          <Stack
            sx={{
              padding: "1rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "2rem",
            }}
          >
            <Icon
              sx={{
                fontSize: "2rem",
                color: "#348ad1",
              }}
            />
          </Stack>
        )}
      </Stack>

      <Stack
        sx={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "0.8rem",
            color: "#757575",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontSize: "1.4rem",
          }}
        >
          {num}
        </Typography>

        {type === "dashboard" && (
          <Typography
            variant="body1"
            sx={{
              fontSize: "0.8rem",
              color: "#757575",
            }}
          >
            last month
          </Typography>
        )}
      </Stack>
    </Styled.Container>
  );
};
