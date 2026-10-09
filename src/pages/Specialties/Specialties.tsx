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

export const Specialties = () => {
  const { search, setSearch, specialties } = useSpecialties();

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
              onClick={() => {
                console.log("Abrir cadastro de paciente");
              }}
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
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder="Buscar especialidade..."
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
