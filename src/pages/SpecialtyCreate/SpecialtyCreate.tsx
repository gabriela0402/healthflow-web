import ArrowBack from "@mui/icons-material/ArrowBack";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { SideBar } from "../../components/SideBar/SideBar";
import { ButtonBlue } from "../../components/Buttons/Buttons";
import * as Styled from "./SpecialtyCreate.styled";
import { useSpecialtyCreate } from "./SpecialtyCreate.hook";

export const SpecialtyCreate = () => {
  const navigate = useNavigate();

  const {
    form,
    isEditing,
    isLoading,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useSpecialtyCreate();

  return (
    <Stack direction="row">
      <SideBar />

      <Styled.Container>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/specialties")}
          sx={{
            alignSelf: "flex-start",
            color: "text.secondary",
            textTransform: "none",
          }}
        >
          Voltar para especialidades
        </Button>

        <Styled.Header>
          <Typography
            variant="h4"
            sx={{
              color: "#102A56",
              fontSize: "1.6rem",
              fontWeight: 700,
            }}
          >
            {isEditing ? "Editar especialidade" : "Adicionar especialidade"}
          </Typography>

          <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
            {isEditing
              ? "Altere os dados da especialidade."
              : "Cadastre uma nova especialidade na clínica."}
          </Typography>
        </Styled.Header>

        <Styled.FormCard>
          <Styled.FormGrid>
            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Nome da especialidade
              </Typography>

              <TextField
                disabled={isLoading}
                size="small"
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Ex.: Cardiologia"
              />
            </Styled.Field>

            <Styled.Field>
              <Typography variant="body2" fontWeight={600}>
                Descrição
              </Typography>

              <TextField
                disabled={isLoading}
                multiline
                minRows={4}
                value={form.description}
                onChange={(event) =>
                  handleChange("description", event.target.value)
                }
                placeholder="Descreva brevemente essa especialidade"
              />
            </Styled.Field>
          </Styled.FormGrid>

          <Styled.Actions>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isSubmitting}
              sx={{ textTransform: "none" }}
            >
              {isEditing ? "Desfazer" : "Limpar"}
            </Button>

            <ButtonBlue
              text={
                isSubmitting
                  ? "Salvando..."
                  : isEditing
                    ? "Salvar alterações"
                    : "Cadastrar especialidade"
              }
              onClick={handleSubmit}
              disabled={isSubmitting || isLoading}
            />
          </Styled.Actions>
        </Styled.FormCard>
      </Styled.Container>
    </Stack>
  );
};
