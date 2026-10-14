import Close from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import * as Styled from "./AvailabilityModal.styled";
import type {
  AvailabilityModalProps,
} from "./AvailabilityModal.types";

export const AvailabilityModal = ({
  open,
  form,
  onClose,
  onChange,
  onSave,
}: AvailabilityModalProps) => {
  const isFormValid =
    Boolean(form.day) &&
    Boolean(form.startTime) &&
    Boolean(form.endTime);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#102A56",
          fontWeight: 700,
        }}
      >
        Nova disponibilidade

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Fechar"
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Styled.FormContainer>
          <Typography
            color="text.secondary"
            sx={{ fontSize: "0.85rem" }}
          >
            Informe o dia e o período em que estará disponível
            para receber atendimentos.
          </Typography>

          <TextField
            select
            fullWidth
            size="small"
            label="Dia da semana"
            value={form.day}
            onChange={(event) =>
              onChange("day", event.target.value)
            }
          >
            <MenuItem value="">
              Selecione um dia
            </MenuItem>

            <MenuItem value="monday">
              Segunda-feira
            </MenuItem>

            <MenuItem value="tuesday">
              Terça-feira
            </MenuItem>

            <MenuItem value="wednesday">
              Quarta-feira
            </MenuItem>

            <MenuItem value="thursday">
              Quinta-feira
            </MenuItem>

            <MenuItem value="friday">
              Sexta-feira
            </MenuItem>

            <MenuItem value="saturday">
              Sábado
            </MenuItem>

            <MenuItem value="sunday">
              Domingo
            </MenuItem>
          </TextField>

          <Styled.TimeContainer>
            <TextField
              fullWidth
              size="small"
              type="time"
              label="Horário inicial"
              value={form.startTime}
              onChange={(event) =>
                onChange(
                  "startTime",
                  event.target.value,
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              fullWidth
              size="small"
              type="time"
              label="Horário final"
              value={form.endTime}
              onChange={(event) =>
                onChange(
                  "endTime",
                  event.target.value,
                )
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Styled.TimeContainer>
        </Styled.FormContainer>
      </DialogContent>

      <DialogActions sx={{ padding: "1rem 1.5rem" }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "none" }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={!isFormValid}
          sx={{ textTransform: "none" }}
        >
          Salvar disponibilidade
        </Button>
      </DialogActions>
    </Dialog>
  );
};
