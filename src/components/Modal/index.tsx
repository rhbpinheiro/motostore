import * as C from "./styles"

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Modal({ open, onClose, children }: ModalProps){
  if (!open) return null;

  return (
    <C.ModalOverlay onClick={onClose}>
        {children}
    </C.ModalOverlay>
  );
};