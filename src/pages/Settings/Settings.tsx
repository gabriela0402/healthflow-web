import Business from "@mui/icons-material/Business";
import Group from "@mui/icons-material/Group";
import Notifications from "@mui/icons-material/Notifications";
import Security from "@mui/icons-material/Security";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue, ButtonWhite } from "../../components/Buttons/Buttons";
import * as Styled from "./Settings.styled";
import { useSettings } from "./Settings.hook";
import type { SettingsTabItem } from "./Settings.types";

const settingsTabs: SettingsTabItem[] = [
  { id: "clinic", label: "Perfil da clínica", icon: Business },
  { id: "users", label: "Usuários e permissões", icon: Group },
  { id: "notifications", label: "Notificações", icon: Notifications },
  { id: "security", label: "Segurança", icon: Security },
];

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  professional: "Profissional",
  patient: "Paciente",
};

export const Settings = () => {
  const {
    activeTab,
    setActiveTab,
    clinicData,
    handleClinicChange,
    handleCancelClinic,
    handleSave,
    saving,
    loading,
    error,
    reload,
    appointmentReminders,
    setAppointmentReminders,
    automaticConfirmation,
    setAutomaticConfirmation,
    users,
    usersLoading,
    passwordForm,
    handlePasswordChange,
    handleChangePassword,
    changingPassword,
  } = useSettings();

  return (
    <>
      <SideBar />

      <Styled.Container>
        <Styled.Header>
          <Typography variant="h4" sx={{ fontSize: "1.2rem" }}>
            Configurações
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "0.9rem" }}>
            Gerencie as preferências da sua clínica.
          </Typography>
        </Styled.Header>

        <Styled.TabsContainer>
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <Styled.TabButton
                key={tab.id}
                type="button"
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon fontSize="small" />
                {tab.label}
              </Styled.TabButton>
            );
          })}
        </Styled.TabsContainer>

        {loading && activeTab !== "security" && activeTab !== "users" && (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress size={28} />
          </Stack>
        )}

        {!loading &&
          error &&
          activeTab !== "security" &&
          activeTab !== "users" && (
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

        {!loading && !error && activeTab === "clinic" && (
          <Styled.ContentCard>
            <Stack>
              <Typography variant="h5">Perfil da clínica</Typography>
              <Typography variant="body2" color="text.secondary">
                Atualize as principais informações da clínica.
              </Typography>
            </Stack>

            <Styled.FormGrid>
              <Styled.FieldContainer>
                <Typography variant="body2" fontWeight={600}>
                  Nome da clínica
                </Typography>
                <TextField
                  size="small"
                  value={clinicData.clinicName}
                  onChange={(e) =>
                    handleClinicChange("clinicName", e.target.value)
                  }
                />
              </Styled.FieldContainer>

              <Styled.FieldContainer>
                <Typography variant="body2" fontWeight={600}>
                  E-mail
                </Typography>
                <TextField
                  size="small"
                  type="email"
                  value={clinicData.email}
                  onChange={(e) => handleClinicChange("email", e.target.value)}
                />
              </Styled.FieldContainer>

              <Styled.FieldContainer>
                <Typography variant="body2" fontWeight={600}>
                  Telefone
                </Typography>
                <TextField
                  size="small"
                  value={clinicData.phone}
                  onChange={(e) => handleClinicChange("phone", e.target.value)}
                />
              </Styled.FieldContainer>

              <Styled.FieldContainer>
                <Typography variant="body2" fontWeight={600}>
                  Endereço
                </Typography>
                <TextField
                  size="small"
                  value={clinicData.address}
                  onChange={(e) =>
                    handleClinicChange("address", e.target.value)
                  }
                />
              </Styled.FieldContainer>
            </Styled.FormGrid>

            <Styled.Actions>
              <ButtonWhite
                text="Cancelar"
                onClick={handleCancelClinic}
                disabled={saving}
              />
              <ButtonBlue
                text={saving ? "Salvando..." : "Salvar alterações"}
                onClick={handleSave}
                disabled={saving}
              />
            </Styled.Actions>
          </Styled.ContentCard>
        )}

        {activeTab === "users" && (
          <Styled.ContentCard>
            <Stack>
              <Typography variant="h5">Usuários e permissões</Typography>
              <Typography variant="body2" color="text.secondary">
                Usuários com acesso ao sistema. Profissionais são criados em
                Profissionais e pacientes em Pacientes.
              </Typography>
            </Stack>

            {usersLoading ? (
              <Stack alignItems="center" sx={{ py: 4 }}>
                <CircularProgress size={26} />
              </Stack>
            ) : (
              <Styled.TableWrapper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>E-mail</TableCell>
                      <TableCell>Perfil</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} hover>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {ROLE_LABELS[(user.role ?? "").toLowerCase()] ??
                            "Sem perfil"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Styled.TableWrapper>
            )}
          </Styled.ContentCard>
        )}

        {!loading && !error && activeTab === "notifications" && (
          <Styled.ContentCard>
            <Typography variant="h5">Notificações</Typography>

            <Styled.PreferenceItem>
              <Styled.PreferenceText>
                <Typography fontWeight={600}>Lembretes de consulta</Typography>
                <Typography variant="body2" color="text.secondary">
                  Preferência salva. O envio dos lembretes ainda não está ativo.
                </Typography>
              </Styled.PreferenceText>
              <Switch
                checked={appointmentReminders}
                onChange={(e) => setAppointmentReminders(e.target.checked)}
              />
            </Styled.PreferenceItem>

            <Styled.PreferenceItem>
              <Styled.PreferenceText>
                <Typography fontWeight={600}>Confirmação automática</Typography>
                <Typography variant="body2" color="text.secondary">
                  Novos agendamentos já são criados como confirmados.
                </Typography>
              </Styled.PreferenceText>
              <Switch
                checked={automaticConfirmation}
                onChange={(e) => setAutomaticConfirmation(e.target.checked)}
              />
            </Styled.PreferenceItem>

            <Styled.Actions>
              <ButtonBlue
                text={saving ? "Salvando..." : "Salvar alterações"}
                onClick={handleSave}
                disabled={saving}
              />
            </Styled.Actions>
          </Styled.ContentCard>
        )}

        {activeTab === "security" && (
          <Styled.ContentCard>
            <Stack>
              <Typography variant="h5">Segurança</Typography>
              <Typography color="text.secondary">
                Altere a senha da sua conta.
              </Typography>
            </Stack>

            <TextField
              label="Senha atual"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                handlePasswordChange("currentPassword", e.target.value)
              }
            />

            <TextField
              label="Nova senha"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) =>
                handlePasswordChange("newPassword", e.target.value)
              }
              helperText="Mínimo de 6 caracteres."
            />

            <TextField
              label="Confirmar nova senha"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
            />

            <Styled.Actions>
              <ButtonBlue
                text={changingPassword ? "Atualizando..." : "Atualizar senha"}
                onClick={handleChangePassword}
                disabled={changingPassword}
              />
            </Styled.Actions>
          </Styled.ContentCard>
        )}
      </Styled.Container>
    </>
  );
};
