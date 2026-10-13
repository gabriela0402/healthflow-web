import { Checkbox, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import * as Styled from "./ProfessionalPatients.styled";
import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue, ButtonWhite } from "../../components/Buttons/Buttons";
import { CalendarToday, DescriptionOutlined, FilterList, MoreHoriz, Search } from "@mui/icons-material";

import { usePatients } from "./ProfessionalPatients.hooks";
import { getInitials } from "./ProfessionalPatients.utils";


import { Card } from "../../components/Card/Card";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const ProfessionalPatients = () => {
  const { search, setSearch, patients } = usePatients();
  return (
    <Stack direction={"row"}>
      <SideBar />
      <Styled.Container>
        <Styled.Header>
          <Stack>
            <Typography
              variant="h4"
              sx={{
                color: "#102A56",
                fontSize: "1.2rem",
                fontWeight: 700,
              }}
            >
              Meus pacientes
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "0.8rem" }}
            >
              Consulte os pacientes sob seu acompanhamento
            </Typography>
          </Stack>

          <Styled.HeaderActions>
            <ButtonBlue text="+ Adicionar paciente" />
          </Styled.HeaderActions>
        </Styled.Header>
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
            title="Consultas agendadas"
            num={"126"}
            type="patient"
          />
        </Styled.CardContainer>
        <Styled.TableContainer>
          <Stack sx={{ padding: "1.4rem" }}>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Lista de Pacientes
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
