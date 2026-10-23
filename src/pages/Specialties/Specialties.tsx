import Search from "@mui/icons-material/Search";
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import { SpecialtyCard } from "../../components/SpecialtyCard/SpecialtyCard";
import * as Styled from "./Specialties.styled";
import { useSpecialties } from "./Specialties.hook";

import MoreVert from "@mui/icons-material/MoreVert";

export const Specialties = () => {
  const navigate = useNavigate();

  const {
    search,
    setSearch,
    coverage,
    setCoverage,
    sort,
    setSort,
    specialties,
    monthlyFlow,
    stats,
    professionalsCount,
    loading,
    error,
    menuAnchor,
    menuSpecialty,
    openMenu,
    closeMenu,
    askDelete,
    toDelete,
    setToDelete,
    confirmDelete,
    isDeleting,
    reload,
  } = useSpecialties();

  const show = (value: number) => (loading ? "..." : String(value));

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
                  Fluxo mensal de pacientes
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
                <LineChart data={monthlyFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5EAF0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    name="Agendamentos"
                    stroke="#1976D2"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#1976D2" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Styled.ChartContainer>
          </Styled.OverviewContainer>

          <Styled.DepartmentContainer>
            <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
              Cobertura das especialidades
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem" }}
              color="text.secondary"
            >
              Especialidades com pelo menos um profissional
            </Typography>

            <Styled.HealthPercentage
              style={{
                background:
                  stats.coverage === null
                    ? "#37699728"
                    : `conic-gradient(#1976D2 0% ${stats.coverage}%, #37699728 ${stats.coverage}% 100%)`,
              }}
            >
              <Styled.PercentageText>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ fontSize: "1.5rem" }}
                >
                  {loading || stats.coverage === null
                    ? "—"
                    : `${stats.coverage}%`}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  cobertas
                </Typography>
              </Styled.PercentageText>
            </Styled.HealthPercentage>

            <Styled.DepartmentStats>
              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  {show(professionalsCount)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Profissionais
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  {show(stats.total)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Especialidades
                </Typography>
              </Styled.DepartmentStat>

              <Styled.StatDivider />

              <Styled.DepartmentStat>
                <Typography variant="h5" sx={{ fontSize: "1rem" }}>
                  {show(stats.withoutProfessionals)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sem profissionais
                </Typography>
              </Styled.DepartmentStat>
            </Styled.DepartmentStats>
          </Styled.DepartmentContainer>
        </Styled.OverviewDepartmentContainer>

        <Styled.FiltersContainer>
          <Styled.SearchContainer>
            <Search sx={{ fontSize: "1.2rem", color: "text.secondary" }} />

            <Styled.SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar especialidade"
            />
          </Styled.SearchContainer>

          <TextField
            select
            size="small"
            value={coverage}
            onChange={(event) => setCoverage(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os profissionais</MenuItem>
            <MenuItem value="with">Com profissionais</MenuItem>
            <MenuItem value="without">Sem profissionais</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="default">Ordenação padrão</MenuItem>
            <MenuItem value="name-asc">Nome: A-Z</MenuItem>
            <MenuItem value="name-desc">Nome: Z-A</MenuItem>
            <MenuItem value="most-used">Mais utilizadas</MenuItem>
            <MenuItem value="least-used">Menos utilizadas</MenuItem>
          </TextField>
        </Styled.FiltersContainer>

        {loading && (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress size={28} />
          </Stack>
        )}

        {!loading && error && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
            action={
              <Button color="inherit" size="small" onClick={reload}>
                Tentar de novo
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {!loading && !error && specialties.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ mt: 3, fontSize: "0.85rem" }}
          >
            Nenhuma especialidade encontrada.
          </Typography>
        )}

        {specialties.map((specialty) => (
          <Box key={specialty.id} sx={{ position: "relative", mt: 3}} >
            <SpecialtyCard
              name={specialty.name}
              description={specialty.description}
              professionals={specialty.professionals}
              monthlyAppointments={specialty.monthlyAppointments}
              professionalsGrowth={specialty.professionalsGrowth}
              appointmentsGrowth={specialty.appointmentsGrowth}
              icon={specialty.icon}
              onDetailsClick={() => {}}
            />

            <IconButton
              size="small"
              aria-label="Mais opções"
              onClick={(event) => openMenu(event.currentTarget, specialty)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        ))}

        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={closeMenu}
        >
          <MenuItem
            onClick={() => {
              closeMenu();
              navigate(`/specialties/${menuSpecialty?.id}/edit`);
            }}
          >
            Editar
          </MenuItem>

          <MenuItem onClick={askDelete} sx={{ color: "error.main" }}>
            Excluir
          </MenuItem>
        </Menu>

        <Dialog open={Boolean(toDelete)} onClose={() => setToDelete(null)}>
          <DialogTitle>Excluir especialidade</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir "{toDelete?.name}"? Essa ação não
              pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setToDelete(null)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button color="error" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogActions>
        </Dialog>
      </Styled.Container>
    </Stack>
  );
};
