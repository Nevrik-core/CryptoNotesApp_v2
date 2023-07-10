import { useEffect } from 'react';
import theme from 'constants/theme';

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
    <div id="modal-container" onClick={handleContainerClick} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', margin: "20px" }}>
        <h2 style={{fontSize: "16px", textAlign: "center"}}>Are you sure you want to delete this note?</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onConfirm} style={{ backgroundColor: theme.colors.red, color: 'white', width: '48%', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: "bold" }}>Yes</button>
          <button onClick={onCancel} style={{ backgroundColor: theme.colors.blue, color: 'white', width: '48%', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: "bold" }}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
