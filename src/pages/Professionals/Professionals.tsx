import MoreVert from "@mui/icons-material/MoreVert";
import Search from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import { Card } from "../../components/Card/Card";
import { ProfessionalCard } from "../../components/ProfessionalCard/ProfessionalCard";
import * as Styled from "./Professionals.styled";
import { useProfessionals } from "./Professionals.hook";
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
    reload,
    menuAnchor,
    menuProfessional,
    openMenu,
    closeMenu,
    askDelete,
    toDelete,
    setToDelete,
    confirmDelete,
    isDeleting,
  } = useProfessionals();

  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const message = (location.state as { toast?: string } | null)?.toast;

    if (message) {
      setToast(message);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

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

          <TextField
            select
            size="small"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todos os status</MenuItem>
            <MenuItem value="available">Com agenda</MenuItem>
            <MenuItem value="unavailable">Sem agenda</MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            value={specialtyFilter}
            onChange={(event) => setSpecialtyFilter(event.target.value)}
            sx={Styled.filterSx}
          >
            <MenuItem value="all">Todas as especialidades</MenuItem>
            {specialties.map((specialty) => (
              <MenuItem key={specialty.id} value={String(specialty.id)}>
                {specialty.name}
              </MenuItem>
            ))}
          </TextField>
        </Styled.FiltersContainer>

        <Styled.CardContainer>
          <Card icon={PeopleIcon} title="Total de profissionais"
            num={loading ? "..." : String(summary.total)} type="patient" />
          <Card icon={PeopleIcon} title="Especialidades"
            num={loading ? "..." : String(summary.specialties)} type="patient" />
          <Card icon={CalendarTodayIcon} title="Com agenda"
            num={loading ? "..." : String(summary.available)} type="patient" />
          <Card icon={CalendarTodayIcon} title="Sem agenda"
            num={loading ? "..." : String(summary.unavailable)} type="patient" />
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

          {!loading && !error && professionals.length === 0 && (
            <Typography sx={{ mt: 2 }} color="text.secondary">
              Nenhum profissional encontrado.
            </Typography>
          )}

          {!loading && !error && professionals.length > 0 && (
            <Styled.ProfessionalsGrid>
              {professionals.map((professional) => (
                <Box key={professional.id} sx={{ position: "relative" }}>
                  <ProfessionalCard
                    name={professional.fullName}
                    job={professional.specialtyName}
                    disponibility={professional.nextAvailability ?? undefined}
                    status={professional.isAvailable}
                  />

                  <IconButton
                    size="small"
                    aria-label="Mais opções"
                    onClick={(event) => openMenu(event.currentTarget, professional)}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <MoreVert fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Styled.ProfessionalsGrid>
          )}
        </Stack>

        <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
          <MenuItem
            onClick={() => {
              closeMenu();
              navigate(`/professionals/${menuProfessional?.id}/edit`);
            }}
          >
            Editar
          </MenuItem>
          <MenuItem onClick={askDelete} sx={{ color: "error.main" }}>
            Excluir
          </MenuItem>
        </Menu>

        <Dialog open={Boolean(toDelete)} onClose={() => setToDelete(null)}>
          <DialogTitle>Excluir profissional</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir "{toDelete?.fullName}"? O login dele
              também será removido. Essa ação não pode ser desfeita.
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

        <Snackbar
          open={Boolean(toast)}
          autoHideDuration={4000}
          onClose={() => setToast(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success" variant="filled" onClose={() => setToast(null)}>
            {toast}
          </Alert>
        </Snackbar>
      </Styled.Container>
    </Stack>
  );
};