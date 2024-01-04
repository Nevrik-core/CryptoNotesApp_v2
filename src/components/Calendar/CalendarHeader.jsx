import React from 'react';
import { CalendarHeaderStyled } from './Calendar.styled';


const CalendarHeader = ({ onNextMonth, onPrevMonth, currentDate }) => {
    return (
        <CalendarHeaderStyled>
            <button onClick={onPrevMonth}>{"<"}</button>
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            <button onClick={onNextMonth}>{">"}</button>
        </CalendarHeaderStyled>
    );
};

export default CalendarHeader;