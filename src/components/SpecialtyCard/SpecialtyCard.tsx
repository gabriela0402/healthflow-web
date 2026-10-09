import { ArrowForward, CalendarToday, People } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import * as Styled from "./SpecialtyCard.styled";
import type { SpecialtyCardProps } from "./SpecialtyCard.types";

export const SpecialtyCard = ({
  name,
  description,
  professionals,
  monthlyAppointments,
  professionalsGrowth,
  appointmentsGrowth,
  icon: Icon,
  onDetailsClick,
}: SpecialtyCardProps) => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.IconContainer>
          <Icon />
        </Styled.IconContainer>

        <Stack minWidth={0}>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontSize: "1rem" }}
          >
            {name}
          </Typography>

          <Styled.Description>
            {description}
          </Styled.Description>
        </Stack>
      </Styled.Header>

      <Styled.Statistics>
        <Styled.Statistic>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <People sx={{ fontSize: "1rem", color: "primary.main" }} />

            <Styled.StatisticTitle>
              Profissionais
            </Styled.StatisticTitle>
          </Stack>

          <Styled.StatisticValue>
            {professionals}
          </Styled.StatisticValue>

          <Styled.Growth>
            ▲ +{professionalsGrowth}% este mês
          </Styled.Growth>
        </Styled.Statistic>

        <Styled.Statistic>
          <Stack direction="row" spacing={0.5} sx={{alignItems:"center"}} >
            <CalendarToday
              sx={{ fontSize: "1rem", color: "primary.main" }}
            />

            <Styled.StatisticTitle>
              Agendamentos mensais
            </Styled.StatisticTitle>
          </Stack>

          <Styled.StatisticValue>
            {monthlyAppointments.toLocaleString("pt-BR")}
          </Styled.StatisticValue>

          <Styled.Growth>
            ▲ +{appointmentsGrowth}% este mês
          </Styled.Growth>
        </Styled.Statistic>
      </Styled.Statistics>

      <Styled.DetailsButton
        variant="outlined"
        onClick={onDetailsClick}
        endIcon={<ArrowForward />}
      >
        Ver detalhes
      </Styled.DetailsButton>
    </Styled.Container>
  );
};
