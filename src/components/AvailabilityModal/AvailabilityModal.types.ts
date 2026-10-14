export type AvailabilityForm = {
  day: string;
  startTime: string;
  endTime: string;
};

export type AvailabilityModalProps = {
  open: boolean;
  form: AvailabilityForm;
  onClose: () => void;
  onChange: (
    field: keyof AvailabilityForm,
    value: string,
  ) => void;
  onSave: () => void;
};
