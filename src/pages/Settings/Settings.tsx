import Business from "@mui/icons-material/Business";
import Group from "@mui/icons-material/Group";
import Notifications from "@mui/icons-material/Notifications";
import Palette from "@mui/icons-material/Palette";
import Security from "@mui/icons-material/Security";
import {
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue, ButtonWhite } from "../../components/Buttons/Buttons";
import * as Styled from "./Settings.styled";
import { useSettings } from "./Settings.hook";
import type { SettingsTabItem } from "./Settings.types";

const settingsTabs: SettingsTabItem[] = [
  {
    id: "clinic",
    label: "Perfil da clínica",
    icon: Business,
  },
  {
    id: "users",
    label: "Usuários e permissões",
    icon: Group,
  },
  {
    id: "notifications",
    label: "Notificações",
    icon: Notifications,
  },
  {
    id: "appearance",
    label: "Aparência",
    icon: Palette,
  },
  {
    id: "security",
    label: "Segurança",
    icon: Security,
  },
];

export const Settings = () => {
  const {
    activeTab,
    setActiveTab,
    clinicData,
    handleClinicChange,
    handleSave,
    appointmentReminders,
    setAppointmentReminders,
    automaticConfirmation,
    setAutomaticConfirmation,
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

        {activeTab === "clinic" && (
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
                  onChange={(event) =>
                    handleClinicChange("clinicName", event.target.value)
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
                  onChange={(event) =>
                    handleClinicChange("email", event.target.value)
                  }
                />
              </Styled.FieldContainer>

              <Styled.FieldContainer>
                <Typography variant="body2" fontWeight={600}>
                  Telefone
                </Typography>

                <TextField
                  size="small"
                  value={clinicData.phone}
                  onChange={(event) =>
                    handleClinicChange("phone", event.target.value)
                  }
                />
              </Styled.FieldContainer>

              <Styled.FieldContainer>
                <Typography variant="body2" fontWeight={600}>
                  Endereço
                </Typography>

                <TextField
                  size="small"
                  value={clinicData.address}
                  onChange={(event) =>
                    handleClinicChange("address", event.target.value)
                  }
                />
              </Styled.FieldContainer>
            </Styled.FormGrid>

            <Styled.Actions>
              <ButtonWhite
                text="Cancelar"
                onClick={() => {
                  console.log("Cancelar alterações");
                }}
              />

              <ButtonBlue text="Salvar alterações" onClick={handleSave} />
            </Styled.Actions>
          </Styled.ContentCard>
        )}

        {activeTab === "users" && (
          <Styled.ContentCard>
            <Typography variant="h5">Usuários e permissões</Typography>

            <Typography color="text.secondary">
              Gerencie os usuários que possuem acesso ao sistema.
            </Typography>

            <TextField
              select
              label="Perfil padrão para novos usuários"
              defaultValue="professional"
            >
              <MenuItem value="admin">Administrador</MenuItem>

              <MenuItem value="professional">Profissional</MenuItem>

              <MenuItem value="patient">Paciente</MenuItem>
            </TextField>
          </Styled.ContentCard>
        )}

        {activeTab === "notifications" && (
          <Styled.ContentCard>
            <Typography variant="h5">Notificações</Typography>

            <Styled.PreferenceItem>
              <Styled.PreferenceText>
                <Typography fontWeight={600}>Lembretes de consulta</Typography>

                <Typography variant="body2" color="text.secondary">
                  Envie lembretes automáticos aos pacientes.
                </Typography>
              </Styled.PreferenceText>

              <Switch
                checked={appointmentReminders}
                onChange={(event) =>
                  setAppointmentReminders(event.target.checked)
                }
              />
            </Styled.PreferenceItem>

            <Styled.PreferenceItem>
              <Styled.PreferenceText>
                <Typography fontWeight={600}>Confirmação automática</Typography>

                <Typography variant="body2" color="text.secondary">
                  Confirme automaticamente novos agendamentos.
                </Typography>
              </Styled.PreferenceText>

              <Switch
                checked={automaticConfirmation}
                onChange={(event) =>
                  setAutomaticConfirmation(event.target.checked)
                }
              />
            </Styled.PreferenceItem>
          </Styled.ContentCard>
        )}

        {activeTab === "appearance" && (
          <Styled.ContentCard>
            <Typography variant="h5">Aparência</Typography>

            <Typography color="text.secondary">
              Personalize a aparência da plataforma.
            </Typography>

            <TextField select label="Tema" defaultValue="light">
              <MenuItem value="light">Claro</MenuItem>

              <MenuItem value="dark">Escuro</MenuItem>

              <MenuItem value="system">Usar configuração do sistema</MenuItem>
            </TextField>
          </Styled.ContentCard>
        )}

        {activeTab === "security" && (
          <Styled.ContentCard>
            <Typography variant="h5">Segurança</Typography>

            <Typography color="text.secondary">
              Gerencie senha e opções de segurança da conta.
            </Typography>

            <TextField label="Senha atual" type="password" />

            <TextField label="Nova senha" type="password" />

            <TextField label="Confirmar nova senha" type="password" />

            <Styled.Actions>
              <ButtonBlue
                text="Atualizar senha"
                onClick={() => {
                  console.log("Atualizar senha");
                }}
              />
            </Styled.Actions>
          </Styled.ContentCard>
        )}
      </Styled.Container>
    </>
  );
};
