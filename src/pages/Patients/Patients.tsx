import { FilterList, Search } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./Patients.styled";
import { Card } from "../../components/Card/Card";

import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import {
  CalendarToday,
  DescriptionOutlined,
  MoreHoriz,
} from "@mui/icons-material";

import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { usePatients } from "./Patients.hook";
import { getInitials } from "./Patients.utils";

export const Patients = () => {
  const { search, setSearch, patients } = usePatients();
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
        </Styled.CardContainer>

        <Styled.TableContainer>
          <Stack sx={{padding: "1.4rem"}}>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Diretório de Pacientes
            </Typography>
          </Stack>
          
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>

                <TableCell>Paciente</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Próximo agendamento</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>

                  <TableCell>
                    <Styled.PatientInfo>
                      <Styled.PatientAvatar>
                        {getInitials(patient.fullName)}
                      </Styled.PatientAvatar>

                      <Stack>
                        <Typography variant="body2" fontWeight={600}>
                          {patient.fullName}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          ID: P{patient.id} • {patient.age} anos •{" "}
                          {patient.gender}
                        </Typography>
                      </Stack>
                    </Styled.PatientInfo>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{patient.email}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">{patient.phone}</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {patient.nextAppointment}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Styled.Status status={patient.status}>
                      {patient.status === "active"
                        ? "Ativo"
                        : patient.status === "pending"
                          ? "Pendente"
                          : "Inativo"}
                    </Styled.Status>
                  </TableCell>

                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end" gap={0.5}>
                      <Styled.ActionButton
                        type="button"
                        title="Agendar consulta"
                        onClick={() => {
                          console.log("Agendar para:", patient.id);
                        }}
                      >
                        <CalendarToday fontSize="small" />
                      </Styled.ActionButton>

                      <Styled.ActionButton
                        type="button"
                        title="Ver detalhes"
                        onClick={() => {
                          console.log("Ver paciente:", patient.id);
                        }}
                      >
                        <DescriptionOutlined fontSize="small" />
                      </Styled.ActionButton>

                      <Styled.ActionButton
                        type="button"
                        title="Mais opções"
                        onClick={() => {
                          console.log("Mais opções:", patient.id);
                        }}
                      >
                        <MoreHoriz fontSize="small" />
                      </Styled.ActionButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Styled.TableContainer>
      </Styled.Container>
    </Stack>
  );
};
