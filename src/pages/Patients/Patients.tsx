import Search from "@mui/icons-material/Search";
import CalendarToday from "@mui/icons-material/CalendarToday";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import PeopleIcon from "@mui/icons-material/People";

import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import { Card } from "../../components/Card/Card";
import * as Styled from "./Patients.styled";
import { usePatients } from "./Patients.hook";
import { getInitials } from "./Patients.utils";


export const Patients = () => {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    status,
    setStatus,
    ageRange,
    setAgeRange,
    gender,
    setGender,
    patients,
    summary,
    loading,
    error,
    reload,
  } = usePatients();

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
              onClick={() => navigate("/patients/new")}
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar pelo nome ou e-mail"
            />
          </Styled.SearchContainer>

          <TextField
            select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os status</MenuItem>
            <MenuItem value="active">Ativos</MenuItem>
            <MenuItem value="pending">Pendentes</MenuItem>
            <MenuItem value="inactive">Inativos</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={ageRange}
            onChange={(event) => setAgeRange(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todas as faixas</MenuItem>
            <MenuItem value="child">Crianças</MenuItem>
            <MenuItem value="adult">Adultos</MenuItem>
            <MenuItem value="elderly">Idosos</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os gêneros</MenuItem>
            <MenuItem value="female">Feminino</MenuItem>
            <MenuItem value="male">Masculino</MenuItem>
            <MenuItem value="other">Outro</MenuItem>
          </TextField>
        </Styled.FiltersContainer>

        <Styled.CardContainer>
          <Card
            icon={PeopleIcon}
            title="Total de Pacientes"
            num={loading ? "..." : String(summary.total)}
            type="patient"
          />
          <Card
            icon={PeopleIcon}
            title="Novos neste mês"
            num={loading ? "..." : String(summary.newThisMonth)}
            type="patient"
          />
          <Card
            icon={CalendarTodayIcon}
            title="Visitas futuras"
            num={loading ? "..." : String(summary.futureVisits)}
            type="patient"
          />
        </Styled.CardContainer>

        <Styled.TableContainer>
          <Stack sx={{ padding: "1.4rem" }}>
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
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress size={26} sx={{ my: 3 }} />
                  </TableCell>
                </TableRow>
              )}

              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Alert
                      severity="error"
                      action={
                        <Button color="inherit" size="small" onClick={reload}>
                          Tentar de novo
                        </Button>
                      }
                    >
                      {error}
                    </Alert>
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && patients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ py: 2 }}
                    >
                      Nenhum paciente encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                !error &&
                patients.map((patient) => (
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
                            ID: P{patient.id} •{" "}
                            {patient.age !== null
                              ? `${patient.age} anos`
                              : "Idade não informada"}{" "}
                            • {patient.gender}
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
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        gap={0.5}
                      >
                        <Styled.ActionButton
                          type="button"
                          title="Agendar consulta"
                          onClick={() =>
                            navigate(
                              `/appointments/new?patientId=${patient.id}`,
                            )
                          }
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