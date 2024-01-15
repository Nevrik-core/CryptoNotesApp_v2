import styled, { css } from 'styled-components';
import theme from 'constants/theme';

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
    color: white; // Базовий колір тексту
    background-color: #2e2e2e; // Базовий колір фону
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    position: relative;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 8px;


    &:hover {
        background-color: #4e4e4e;
    }
    ${props => props["data-istoday"] && css`
    &::before {
      content: "";
      position: absolute;
      display: block;
      transform: translateX(50%);
      top: 6px;
      right: 16px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: red;
      box-shadow: ${theme.effects.dropShortShadow};
    }
  `}

    background: ${props => {
            const colors = props["data-daycolors"][props["data-datestr"]] || [];
            if (colors.length > 0) {
                let gradient = 'linear-gradient(to right';
                colors.forEach((color, index) => {
                    const start = index * 10;
                    const end = start + 10;
                    gradient += `, ${color} ${start}%, ${color} ${end}%`;
                });
                gradient += ')';
                return gradient;
            }
            return props["data-isactivemonth"] ? '#3e3e3e' : 'inherit';
    }};
`;

export const DateContainer = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;

    color: ${({ isToday }) => (isToday ? 'red' : 'inherit')};
    font-weight: ${({ isToday }) => (isToday ? 'bold' : 'normal')};
`;

export const NoteText = styled.div`
    font-size: 2px; // Мінімальний розмір шрифту
    color: #000; // Колір тексту
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; // Щоб текст не переносився на новий рядок
    max-width: 100%; // Максимальна ширина тексту
`;