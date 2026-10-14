export type SpecialtyModalItem = {
  id: number;
  name: string;
  description: string;
};

export type SpecialtiesModalProps = {
  open: boolean;
  specialties: SpecialtyModalItem[];
  onClose: () => void;
  onSchedule: (specialtyId: number) => void;
};
