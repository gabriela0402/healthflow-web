import {
  FilterList,
  Search,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./Patients.styled";

export const Patients = () => {
  return (
    <Stack sx={{ flexDirection: "row" }}>
      <SideBar />

      <Styled.Container>
        <Styled.TitleContainer>
          <Stack>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Pacientes
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Administre os pacientes da clínica.
            </Typography>
          </Stack>

          <Stack sx={{ minWidth: "190px" }}>
            <ButtonBlue
              text="+ Adicionar paciente"
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
              Todas as faixas
            </option>
            <option value="child">Crianças</option>
            <option value="adult">Adultos</option>
            <option value="elderly">Idosos</option>
          </Styled.FilterSelect>

          <Styled.FilterSelect defaultValue="">
            <option value="" disabled>
              Todos os gêneros
            </option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
            <option value="other">Outro</option>
          </Styled.FilterSelect>

          <Styled.MoreFiltersButton
            type="button"
            onClick={() => {
              console.log("Abrir filtros adicionais");
            }}
          >
            <FilterList fontSize="small" />
            Mais filtros
          </Styled.MoreFiltersButton>
        </Styled.FiltersContainer>
      </Styled.Container>
    </Stack>
  );
};
