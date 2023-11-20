import styled from 'styled-components';
import theme from 'constants/theme';

export const CalendarContainer = styled.div`
    height: calc(100vh - 120px);
    display: flex;
    flex-direction: column; 
    background-color: #2e2e2e;
    padding: 15px;
    border-radius: 10px;
    margin: 0 auto;
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    color: white;
    font-size: 24px;
`;

export const DaysOfWeekContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(50px, 1fr); 
`;


export const DayOfWeek = styled.div`
    text-align: right;
    padding: 10px 5px;
    color: #888;
`;

export const DaysOfMonthContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 1fr; 
    gap: 10px;
    flex-grow: 1;
`;


export const DayOfMonth = styled.div`
    text-align: center;
    padding: 10px 0;
    color: ${props => (props.isToday ? "black" : "white")};
    background-color: ${props => props.isActiveMonth ? '#3e3e3e' : '#2e2e2e'};
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #4e4e4e;
    }

    position: relative;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 8px;

    position: relative;

    &::before {
    content: "${props => (props.isToday ? '' : '')}";
    position: ${props => (props.isToday ? "absolute" : '')};
    transform: translateX(50%); 
    top: 6px;
    right: 16px;
    width: 25px; 
    height: 25px; 
    border-radius: 50%;
    background-color: red;
    box-shadow: ${theme.effects.dropShortShadow};
}

    background: ${({ dayColors, date }) =>
    dayColors[date] && dayColors[date].length > 0
      ? `linear-gradient(${dayColors[date].join(", ")})`
      : "defaultBackgroundColor"};
`;


export const DateContainer = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
`;




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
    border: solid 2px black;
    border-radius: 50%; 
    cursor: pointer;
    &:hover {
        opacity: 0.8; 
    }
    border: ${props => props.isSelected ? "3px solid gold" : "solid 2px black"};
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #333;
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

export const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 5;
`;
