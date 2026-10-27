import Search from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Alert,
  Button,
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

import { SideBar } from "../../components/SideBar/SideBar";
import { Card } from "../../components/Card/Card";
import * as Styled from "./ProfessionalPatients.styled";
import { usePatients } from "./ProfessionalPatients.hooks";
import { getInitials } from "./ProfessionalPatients.utils";

const STATUS_LABELS = {
  active: "Ativo",
  pending: "Pendente",
  inactive: "Inativo",
};

export const ProfessionalPatients = () => {
  const {
    search,
    setSearch,
    status,
    setStatus,
    gender,
    setGender,
    patients,
    summary,
    loading,
    error,
    reload,
  } = usePatients();

  const show = (value: number) => (loading ? "..." : String(value));

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Styled.Header>
          <Stack>
            <Typography
              variant="h4"
              sx={{ color: "#102A56", fontSize: "1.2rem", fontWeight: 700 }}
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
        </Styled.Header>

        <Styled.FiltersContainer>
          <Styled.SearchContainer>
            <Search sx={{ fontSize: "1.2rem", color: "text.secondary" }} />

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
          <Card icon={PeopleIcon} title="Total de Pacientes"
            num={show(summary.total)} type="patient" />
          <Card icon={PeopleIcon} title="Novos neste mês"
            num={show(summary.newThisMonth)} type="patient" />
          <Card icon={CalendarTodayIcon} title="Consultas agendadas"
            num={show(summary.scheduled)} type="patient" />
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
                <TableCell>Paciente</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Próximo agendamento</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress size={26} sx={{ my: 3 }} />
                  </TableCell>
                </TableRow>
              )}

              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={5}>
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
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                      Nenhum paciente encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              )}

              {!loading &&
                !error &&
                patients.map((patient) => (
                  <TableRow key={patient.id} hover>
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
                      <Typography variant="body2">{patient.nextAppointment}</Typography>
                    </TableCell>

                    <TableCell>
                      <Styled.Status status={patient.status}>
                        {STATUS_LABELS[patient.status]}
                      </Styled.Status>
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