import styled, {css} from 'styled-components';
import theme from 'constants/theme';

export const ColorPickerContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 15px;
    z-index: 10;
    width: 60%;
`;

export const ColorButton = styled.button`
    background-color: ${props => props.color};
  width: 50px; 
  height: 50px; 
  border-radius: 50%; 
  cursor: pointer;
  border: 2px solid black;
  &:hover {
    opacity: 0.8; 
  }

  ${props => props["data-isselected"] && css`
    border-color: gold;
    border-width: 3px;
  `}
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width: 100%; 
`;

export const ActionButton = styled.button`
    width: 80%; 
    padding: 10px;
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: transparent;
    color: black;
    cursor: pointer;
    &:hover {
        background-color: #f8f8f8;
    }
`;