import styled from 'styled-components';

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
}
`;


export const DateContainer = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
`;