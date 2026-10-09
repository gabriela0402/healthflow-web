import { Stack, Typography } from "@mui/material";
import React from "react";
import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./Professionals.styled";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import { Search } from "@mui/icons-material";
import { useProfessionals } from "./Professionals.hook";
import { Card } from "../../components/Card/Card";

import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ProfessionalCard } from "../../components/ProfessionalCard/ProfessionalCard";

export const Professionals = () => {
  const { search, setSearch, professioanals } = useProfessionals();
  return (
    <Stack sx={{ flexDirection: "row" }}>
      <SideBar />
      <Styled.Container>
        <Styled.TitleContainer>
          <Stack>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Profissionais
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Administre os profissionais da clínica.
            </Typography>
          </Stack>

          <Stack sx={{ minWidth: "190px" }}>
            <ButtonBlue
              text="+ Adicionar profissional"
              onClick={() => {
                console.log("Abrir cadastro de paciente");
              }}
            />
          </Stack>
        </Styled.TitleContainer>
        <Styled.FiltersContainer>
          <Styled.SearchContainer>
            <Search
              sx={{
                fontSize: "1.2rem",
                color: "text.secondary",
              }}
            />

            <Styled.SearchInput
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder="Buscar pelo nome ou e-mail"
            />
          </Styled.SearchContainer>

          <Styled.FilterSelect defaultValue="">
            <option value="" disabled>
              Todos os status
            </option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </Styled.FilterSelect>

          <Styled.FilterSelect defaultValue="">
            <option value="" disabled>
              Todas especialidades
            </option>
            <option value="geral">Clínica Geral</option>
            <option value="cardiologia">Cardiologia</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Endocrinologia">Endocrinologia</option>
            <option value="Ginecologia">Ginecologia</option>
            <option value="Neurologia">Neurologia</option>
            <option value="Nutrição">Nutrição</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Pediatria">Pediatria</option>
            <option value="Psicologia">Psicologia</option>
          </Styled.FilterSelect>
        </Styled.FiltersContainer>
        <Styled.CardContainer>
          <Card
            icon={PeopleIcon}
            title="Total de Pacientes"
            num={"234"}
            type="patient"
          />
          <Card
            icon={PeopleIcon}
            title="Novos neste mês"
            num={"234"}
            type="patient"
          />
          <Card
            icon={CalendarTodayIcon}
            title="Visitas futuras"
            num={"126"}
            type="patient"
          />
          <Card
            icon={CalendarTodayIcon}
            title="Visitas futuras"
            num={"126"}
            type="patient"
          />
        </Styled.CardContainer>
        <Stack sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
            Profissionais da clínica
          </Typography>
          <Stack sx={{ flexDirection: "row", gap: "1rem", mt: 1 }}></Stack>
          <Styled.ProfessionalsGrid>
            <ProfessionalCard
              name="Lady Gaga"
              job="Dentista"
              rate={2}
              disponibility="Hoje, 10:30"
              local="Centro"
              status={true}
            />
            <ProfessionalCard
              name="Ed Sheeran"
              job="Oftamologista"
              rate={4}
              disponibility="Amanhã, 11:30"
              local="Clínica Geral"
              status={false}
            />
            <ProfessionalCard
              name="Rihana"
              job="Fisioterapeuta"
              rate={5}
              disponibility="Quinta, 14:00"
              local="Centro"
              status={false}
            />
            <ProfessionalCard
              name="Selena Gomez"
              job="Fonodióloga"
              rate={5}
              disponibility="Quinta, 14:00"
              local="Centro"
              status={false}
            />
            <ProfessionalCard
              name="Ariana Grande"
              job="Ginecologia"
              rate={5}
              disponibility="Quinta, 14:00"
              local="Centro"
              status={true}
            />
            <ProfessionalCard
              name="Sabrina Carpenter"
              job="Nutrição"
              rate={5}
              disponibility="Quinta, 14:00"
              local="Centro"
              status={true}
            />
          </Styled.ProfessionalsGrid>
        </Stack>
      </Styled.Container>
    </Stack>
  );
};
