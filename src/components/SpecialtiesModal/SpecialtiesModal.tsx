import ArrowForward from "@mui/icons-material/ArrowForward";
import Close from "@mui/icons-material/Close";
import Healing from "@mui/icons-material/Healing";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import * as Styled from "./SpecialtiesModal.styled";
import type {
  SpecialtiesModalProps,
} from "./SpecialtiesModal.types";

export const SpecialtiesModal = ({
  open,
  specialties,
  onClose,
  onSchedule,
}: SpecialtiesModalProps) => {
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
        Especialidades disponíveis

        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Fechar"
        >
          <Close fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography
          color="text.secondary"
          sx={{ fontSize: "0.82rem" }}
        >
          Escolha uma especialidade para iniciar o agendamento
          da sua consulta.
        </Typography>

        <Styled.SpecialtyList>
          {specialties.map((specialty) => (
            <Styled.SpecialtyItem key={specialty.id}>
              <Styled.SpecialtyIcon>
                <Healing fontSize="small" />
              </Styled.SpecialtyIcon>

              <Styled.SpecialtyContent>
                <Typography
                  sx={{
                    color: "#102A56",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                  }}
                >
                  {specialty.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: "0.7rem",
                    lineHeight: 1.4,
                  }}
                >
                  {specialty.description}
                </Typography>
              </Styled.SpecialtyContent>

              <Button
                size="small"
                endIcon={<ArrowForward />}
                onClick={() => onSchedule(specialty.id)}
                sx={{
                  minWidth: "fit-content",
                  fontSize: "0.7rem",
                  textTransform: "none",
                }}
              >
                Agendar
              </Button>
            </Styled.SpecialtyItem>
          ))}
        </Styled.SpecialtyList>
      </DialogContent>

      <DialogActions sx={{ padding: "1rem 1.5rem" }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none" }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
