import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./ProfessionalCreate.styled";
import { useProfessionalCreate } from "./ProfessionalCreate.hook";

export const ProfessionalCreate = () => {
  const navigate = useNavigate();

  const {
    form,
    specialties,
    isEditing,
    hasLogin,
    loading,
    submitting,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
    clearError,
  } = useProfessionalCreate();

  const emailLocked = isEditing && hasLogin;

  const passwordLabel = !isEditing || !hasLogin ? "Senha inicial" : "Nova senha (opcional)";

  const passwordHelp = !isEditing
    ? "O profissional usará essa senha no primeiro acesso."
    : hasLogin
      ? "Deixe em branco para manter a senha atual."
      : "Informe e-mail e senha para criar o acesso deste profissional.";

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/professionals")}
          sx={{ alignSelf: "flex-start", color: "text.secondary", textTransform: "none" }}
        >
          Voltar para profissionais
        </Button>

        <Styled.Header>
          <Typography
            variant="h4"
            sx={{ color: "#102A56", fontSize: "1.6rem", fontWeight: 700 }}
          >
            {isEditing ? "Editar profissional" : "Adicionar profissional"}
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            {isEditing
              ? "Altere os dados do profissional."
              : "Cadastre um novo profissional na clínica."}
          </Typography>
        </Styled.Header>

        <Styled.FormCard>
          <Styled.FormGrid>
            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>Nome completo</Typography>
              <TextField
                size="small"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Digite o nome completo"
                disabled={loading}
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>Especialidade</Typography>
              <TextField
                select
                size="small"
                value={form.specialtyId || "none"}
                onChange={(e) =>
                  handleChange("specialtyId", e.target.value === "none" ? "" : e.target.value)
                }
                disabled={loading}
              >
                <MenuItem value="none" disabled>Selecione</MenuItem>
                {specialties.map((specialty) => (
                  <MenuItem key={specialty.id} value={String(specialty.id)}>
                    {specialty.name}
                  </MenuItem>
                ))}
              </TextField>
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>Registro profissional</Typography>
              <TextField
                size="small"
                value={form.registrationNumber}
                onChange={(e) => handleChange("registrationNumber", e.target.value)}
                placeholder="Ex.: CRM-SP 123.456"
                disabled={loading}
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>E-mail (login)</Typography>
              <TextField
                size="small"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Digite o e-mail"
                disabled={loading || emailLocked}
                helperText={emailLocked ? "O e-mail é o login e não pode ser alterado." : undefined}
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>{passwordLabel}</Typography>
              <TextField
                size="small"
                type="password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                disabled={loading}
                helperText={passwordHelp}
              />
            </Styled.Field>
          </Styled.FormGrid>

          <Snackbar
            open={Boolean(error)}
            autoHideDuration={5000}
            onClose={clearError}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert severity="error" variant="filled" onClose={clearError}>
              {error}
            </Alert>
          </Snackbar>

          <Styled.Actions>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={submitting}
              sx={{ textTransform: "none" }}
            >
              {isEditing ? "Desfazer" : "Limpar"}
            </Button>

            <ButtonBlue
              text={
                submitting
                  ? "Salvando..."
                  : isEditing
                    ? "Salvar alterações"
                    : "Cadastrar profissional"
              }
              onClick={handleSubmit}
              disabled={submitting || loading}
            />
          </Styled.Actions>
        </Styled.FormCard>
      </Styled.Container>
    </Stack>
  );
};