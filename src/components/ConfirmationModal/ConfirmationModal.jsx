import { useEffect } from 'react';
import { ModalContainer, ModalContent, ModalHeader, ButtonsContainer, ModalButton } from './ConfirmationModal.styled';


const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const handleContainerClick = (event) => {
    if (event.target.id === 'modal-container') {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalContainer id="modal-container" onClick={handleContainerClick}>
      <ModalContent>
        <ModalHeader>Are you sure you want to delete this note?</ModalHeader>
        <ButtonsContainer>
          <ModalButton onClick={onConfirm}>Yes</ModalButton>
          <ModalButton onClick={onCancel}>No</ModalButton>
        </ButtonsContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default ConfirmationModal;
