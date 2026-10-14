import { Stack, Typography } from "@mui/material";
import { Search, FilterList } from "@mui/icons-material";
import { useSpecialties } from "./Specialties.hook";
import { SideBar } from "../../components/SideBar/SideBar";
import * as Styled from "./Specialties.styled";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { appointmentData } from "./Specialties.utils";

import { SpecialtyCard } from "../../components/SpecialtyCard/SpecialtyCard";

import { useNavigate } from "react-router-dom";

export const Specialties = () => {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    sort,
    setSort,
    specialties,
    showMoreFilters,
    toggleMoreFilters,
  } = useSpecialties();

  return (
    <Stack sx={{ flexDirection: "row" }}>
      <SideBar />
      <Styled.Container>
        <Styled.TitleContainer>
          <Stack>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Especialidades Médicas
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
              Administre as áreas da saúde e os serviços clínicos
            </Typography>
          </Stack>

          <Stack sx={{ minWidth: "190px" }}>
            <ButtonBlue
              text="+ Adicionar especialidade"
              onClick={() => navigate("/specialties/new")}
            />
          </Stack>
        </Styled.TitleContainer>
        <Styled.OverviewDepartmentContainer>
          <Styled.OverviewContainer>
            <Styled.OverviewHeader>
              <Stack>
                <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
                  Fluxo semanal de pacientes
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.8rem" }}
                  color="text.secondary"
                >
                  Total de consultas em todas as especialidades
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Últimos 7 meses
              </Typography>
            </Styled.OverviewHeader>

            <Styled.ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF0" />

                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />

                  <YAxis tick={{ fontSize: 12 }} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="#1976D2"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      fill: "#1976D2",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Styled.ChartContainer>
          </Styled.OverviewContainer>

          <Styled.DepartmentContainer>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Saúde do departamento
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem" }}
              color="text.secondary"
            >
              Desempenho geral da clínica
            </Typography>

            <Styled.HealthPercentage>
              <Styled.PercentageText>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ fontSize: "1.5rem" }}
                >
                  92%
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  saudável
                </Typography>
              </Styled.PercentageText>
            </Styled.HealthPercentage>

            <Styled.DepartmentStats>
              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  58
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Profissionais
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  12
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Especialidades
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  4.8
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Avaliação
                </Typography>
              </Styled.DepartmentStat>
            </Styled.DepartmentStats>
          </Styled.DepartmentContainer>
        </Styled.OverviewDepartmentContainer>
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar especialidade"
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
              Ordenar por nome
            </option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
            <option value="other">Outro</option>
          </Styled.FilterSelect>

          <Styled.MoreFiltersButton type="button" onClick={toggleMoreFilters}>
            <FilterList fontSize="small" />
            {showMoreFilters ? "Ocultar filtros" : "Mais filtros"}
          </Styled.MoreFiltersButton>
        </Styled.FiltersContainer>
        {showMoreFilters && (
          <Styled.AdvancedFiltersContainer>
            <Styled.FilterSelect
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="default">Ordenação padrão</option>

              <option value="name-asc">Nome: A-Z</option>

              <option value="name-desc">Nome: Z-A</option>
            </Styled.FilterSelect>

            <Styled.FilterSelect defaultValue="all">
              <option value="all">Todos os profissionais</option>

              <option value="with-professionals">Com profissionais</option>

              <option value="without-professionals">Sem profissionais</option>
            </Styled.FilterSelect>

            <Styled.FilterSelect defaultValue="all">
              <option value="all">Todos os atendimentos</option>

              <option value="most-used">Mais utilizadas</option>

              <option value="least-used">Menos utilizadas</option>
            </Styled.FilterSelect>
          </Styled.AdvancedFiltersContainer>
        )}

        <Styled.SpecialtiesGrid>
          {specialties.map((specialty) => (
            <SpecialtyCard
              key={specialty.id}
              name={specialty.name}
              description={specialty.description}
              professionals={specialty.professionals}
              monthlyAppointments={specialty.monthlyAppointments}
              professionalsGrowth={specialty.professionalsGrowth}
              appointmentsGrowth={specialty.appointmentsGrowth}
              icon={specialty.icon}
              onDetailsClick={() => {
                console.log("Ver especialidade:", specialty.id);
              }}
            />
          ))}
        </Styled.SpecialtiesGrid>
      </Styled.Container>
    </Stack>
  );
};
