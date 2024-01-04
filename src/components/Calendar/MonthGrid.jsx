import React from "react";
import { DaysOfMonthContainer, DayOfMonth, DateContainer } from "./MonthGrid.styled";


const MonthGrid = ({ daysOfMonth, handleDayClick, dayColors, currentDate }) => {
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();


    return (
    <DaysOfMonthContainer>
      {daysOfMonth.map((day, index) => {
        const isActiveMonth = day.getMonth() === currentDate.getMonth();
        const isToday = day.getDate() === currentDay && day.getMonth() === currentMonth && day.getFullYear() === currentYear;
        const dateStr = day.toDateString();

        return (
            <DayOfMonth
                key={index}
                data-isactivemonth={isActiveMonth}
                data-istoday={isToday}
                data-datestr={dateStr}
                data-daycolors={dayColors}
                onClick={(e) => handleDayClick(e, day)}>
            <DateContainer>{day.getDate()}</DateContainer>
          </DayOfMonth>
        );
      })}
    </DaysOfMonthContainer>
  );
};

export default MonthGrid;
