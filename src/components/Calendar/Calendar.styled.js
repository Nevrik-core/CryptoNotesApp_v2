import styled from 'styled-components';

export const CalendarContainer = styled.div`
    background-color: #2e2e2e;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
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
`;

export const DayOfWeek = styled.div`
    text-align: center;
    padding: 10px 0;
    color: #888;
`;

export const DaysOfMonthContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
`;

export const DayOfMonth = styled.div`
    text-align: center;
    padding: 10px 0;
    color: white;
    background-color: ${props => props.isActiveMonth ? '#3e3e3e' : '#2e2e2e'};
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #4e4e4e;
    }
`;
