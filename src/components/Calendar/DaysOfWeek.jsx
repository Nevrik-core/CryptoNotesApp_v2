import React from "react";
import { DayOfWeek, DaysOfWeekContainer } from "./Calendar.styled";


const DaysOfWeek = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <DaysOfWeekContainer>
            {days.map(day => (
                <DayOfWeek key={day}>{day}</DayOfWeek>
            ))}
       </DaysOfWeekContainer> 
    );
}

export default DaysOfWeek;