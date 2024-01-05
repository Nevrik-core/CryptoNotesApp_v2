import styled, { css } from 'styled-components';
import theme from 'constants/theme';

export const CalendarContainer = styled.div`
    min-height: calc(100vh - 120px);
    height: auto;
    display: flex;
    flex-direction: column; 
    background-color: #2e2e2e;
    padding: 15px;
    border-radius: 10px;
    margin: 0 auto;
    
`;

export const CalendarHeaderStyled = styled.div`
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

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #333;
`;

export const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  ${props => props["data-isopen"] && css`
    display: block;
`}
`;
