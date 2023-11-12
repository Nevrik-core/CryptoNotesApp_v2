import styled from 'styled-components';
import theme from 'constants/theme';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
`;

export const ModalHeader = styled.h2`
  font-size: 16px;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalButton = styled.button`
  color: white;
  width: 48%;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;

  &:first-child {
    background-color: ${theme.colors.red};
  }

  &:last-child {
    background-color: ${theme.colors.blue};
  }
`;


export const ActionButton = styled.button`
    width: 80%; // Большая ширина для удобства использования
    padding: 10px;
    margin: 5px 0; // Пространство сверху и снизу кнопки
    border: 1px solid #ccc; // Граница для видимости на белом фоне
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    &:hover {
        background-color: #f8f8f8; // Эффект при наведении
    }
`;