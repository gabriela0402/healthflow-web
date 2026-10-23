import { CircularProgress, Stack, Typography } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import type { StatusFilter } from "./Professionals.types";

export const Professionals = () => {
  const {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    specialtyFilter,
    setSpecialtyFilter,
    professionals,
    specialties,
    summary,
    loading,
    error,
  } = useProfessionals();
  const navigate = useNavigate();

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
              onClick={() => navigate("/professionals/new")}
            />
          </Stack>
        </Styled.TitleContainer>

        <Styled.FiltersContainer>
          <Styled.SearchContainer>
            <Search sx={{ fontSize: "1.2rem", color: "text.secondary" }} />
            <Styled.SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, registro ou especialidade"
            />
          </Styled.SearchContainer>

          <Styled.FilterSelect
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
          >
            <option value="">Todos os status</option>
            <option value="available">Disponíveis</option>
            <option value="unavailable">Indisponíveis</option>
          </Styled.FilterSelect>

          <Styled.FilterSelect
            value={specialtyFilter}
            onChange={(event) => setSpecialtyFilter(event.target.value)}
          >
            <option value="">Todas as especialidades</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </Styled.FilterSelect>
        </Styled.FiltersContainer>

        <Styled.CardContainer>
          <Card icon={PeopleIcon} title="Total de profissionais" num={String(summary.total)} type="patient" />
          <Card icon={PeopleIcon} title="Especialidades" num={String(summary.specialties)} type="patient" />
          <Card icon={CalendarTodayIcon} title="Com agenda" num={String(summary.available)} type="patient" />
          <Card icon={CalendarTodayIcon} title="Sem agenda" num={String(summary.unavailable)} type="patient" />
        </Styled.CardContainer>

        <Stack sx={{ mt: 3 }}>
          <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
            Profissionais da clínica
          </Typography>

          {loading && (
            <Stack sx={{ alignItems: "center", mt: 4 }}>
              <CircularProgress />
            </Stack>
          )}

          {!loading && error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && professionals.length === 0 && (
            <Typography sx={{ mt: 2 }} color="text.secondary">
              Nenhum profissional encontrado.
            </Typography>
          )}

          {!loading && !error && professionals.length > 0 && (
            <Styled.ProfessionalsGrid>
              {professionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  name={professional.fullName}
                  job={professional.specialtyName}
                  disponibility={professional.nextAvailability ?? undefined}
                  status={professional.isAvailable}
                />
              ))}
            </Styled.ProfessionalsGrid>
          )}
        </Stack>
      </Styled.Container>
    </Stack>
  );
};