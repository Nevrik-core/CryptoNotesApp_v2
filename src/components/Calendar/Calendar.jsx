import React, { useState, useEffect } from 'react';
import { CalendarContainer, CalendarHeader, DaysOfWeekContainer, DayOfWeek, DaysOfMonthContainer, DayOfMonth, DateContainer } from './Calendar.styled';
import { getAllColors, setColorForDate } from 'services/firebase/notes';
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = ({userId}) => {

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

   

    const colors = [
        'red', 'tomato', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 'white' 
        
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dayColors, setDayColors] = useState({}); // для хранения цветов по датам

    const handleNewNote = () => {
        setIsMenuOpen(false); 
    };
    
    const handleGoToNotes = () => {
        setIsMenuOpen(false); 
    };

    const handleColorSelect = async (color) => {
        if (color === null) {
            const newColors = { ...dayColors };
            delete newColors[selectedDate.toDateString()];
            setDayColors(newColors);
        } else {
            setDayColors(prev => ({
                ...prev,
                [selectedDate.toDateString()]: color
            }));
        }
        setIsMenuOpen(false);
        await setColorForDate(userId, selectedDate.toDateString(), color);
        
    };
    
    const handleDayClick = (date) => {
        setSelectedDate(date);
        setIsMenuOpen(true);
    };
    

    const generateDaysOfMonth = (date) => {
        const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7;
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    
        const days = [];

        
    
        // Добавляем дни из предыдущего месяца
        for (let i = 0; i < startDay - 1; i++) {
            const day = new Date(date.getFullYear(), date.getMonth(), -(startDay - 2 - i));
            days.push(day);
        }
    
        // Добавляем дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(date.getFullYear(), date.getMonth(), i);
            days.push(day);
        }
    
        // Добавляем дни следующего месяца, чтобы заполнить календарь
        const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        for (let i = 1; i <= 7 - endDay; i++) {
            const day = new Date(date.getFullYear(), date.getMonth() + 1, i);
            days.push(day);
        }
        
    
        return days;
    };
    

    const daysOfMonth = generateDaysOfMonth(currentDate);

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentDate(new Date());
        }, 60000); // проверять каждую минуту
      
        return () => clearInterval(interval); // очистка при размонтировании компонента
      }, []);

      useEffect(() => {
        // При монтировании компонента загружаем все цвета для этого пользователя
        const loadColors = async () => {
            const loadedColors = await getAllColors(userId); 
            setDayColors(loadedColors);
        }
        loadColors();
    }, [userId]);

    return (
        <CalendarContainer>
            <CalendarHeader>
                <button onClick={handlePrevMonth}>{"<"}</button>
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                <button onClick={handleNextMonth}>{">"}</button>
            </CalendarHeader>
            <DaysOfWeekContainer>
                {daysOfWeek.map((day) => (
                    <DayOfWeek key={day}>{day}</DayOfWeek>
                ))}
            </DaysOfWeekContainer>
            <DaysOfMonthContainer>
                 {generateDaysOfMonth(currentDate).map((day, index) => (
                   <DayOfMonth
                    
                   style={{backgroundColor: dayColors[day.toDateString()] || (day.getMonth() === currentDate.getMonth() ? '#3e3e3e' : '#2e2e2e')}}
                   key={index} 
                   isActiveMonth={day.getMonth() === currentDate.getMonth()}
                   onClick={() => handleDayClick(day)}
                   isToday={day.getDate() === currentDay && day.getMonth() === currentMonth && day.getFullYear() === currentYear}

               >
                   <DateContainer>
                       {day.getDate()}
                   </DateContainer>
               </DayOfMonth>
               
                
               
    ))}
</DaysOfMonthContainer>
{isMenuOpen && (
    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px'}}>
        {colors.map(color => (
    <button 
        key={color} 
        style={{backgroundColor: color, width: '20px', height: '20px'}}
        onClick={() => handleColorSelect(color)}
    />   
))}
        <button 
    key="no-color" 
    style={{backgroundColor: 'transparent', width: '20px', height: '20px', border: '1px solid #000'}}
    onClick={() => handleColorSelect(null)}
/>
        <button onClick={() => setIsMenuOpen(false)}>Закрыть</button>
        <button 
    style={{width: '20px', height: '20px', margin: '5px', border: '1px solid #000'}}
    onClick={handleNewNote}
>
    New Note
</button>
<button 
    style={{width: '20px', height: '20px', margin: '5px', border: '1px solid #000'}}
    onClick={handleGoToNotes}
>
    Go to Notes
</button>

    </div>
)}

        </CalendarContainer>
    );
};

export default Calendar;
