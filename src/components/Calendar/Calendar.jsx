import React, { useState, useEffect, useRef } from 'react';
import { CalendarContainer, CalendarHeader, DaysOfWeekContainer, DayOfWeek, DaysOfMonthContainer, DayOfMonth, DateContainer, ColorPickerContainer, ColorButton, CloseButton, ActionsContainer, ActionButton, Overlay } from './Calendar.styled';
import { getAllColors, setColorForDate } from 'services/firebase/notes';
import { useLocation } from 'react-router-dom';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = ({userId}) => {

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const location = useLocation();
   

    const colors = [
        'red', 'tomato', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black', 
        
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
    
    const handleDayClick = (e, date) => {
        e.stopPropagation()
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

        const updateCurrentDate = () => {
            setCurrentDate(new Date());
        };

        
         if (location.pathname === '/calendar') {
            const interval = setInterval(updateCurrentDate, 6000000);

            updateCurrentDate();

        return () => clearInterval(interval);
        }
    }, [location]);

      useEffect(() => {
        // При монтировании компонента загружаем все цвета для этого пользователя
        const loadColors = async () => {
            const loadedColors = await getAllColors(userId); 
            setDayColors(loadedColors);
        }
        loadColors();
    }, [userId]);

    useEffect(() => {
    const closeOnEscapeKeyDown = (e) => {
        if ((e.charCode || e.keyCode) === 27) {
            setIsMenuOpen(false);
        }
    };
        

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
        document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
    }, []);

    const menuRef = useRef(null);
    useEffect(() => {
        const closeOnClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                 setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', closeOnClickOutside);
        return () => {
            document.removeEventListener('mousedown', closeOnClickOutside);
        };
    }, []);

    



    return (
        <CalendarContainer>
            <Overlay isOpen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />
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
                        onClick={(e) => handleDayClick(e, day)}
                        isToday={day.getDate() === currentDay && day.getMonth() === currentMonth && day.getFullYear() === currentYear}>
                        <DateContainer>
                            {day.getDate()}
                        </DateContainer>
                    </DayOfMonth>
                    ))}
            </DaysOfMonthContainer>
            {isMenuOpen && (
                <ColorPickerContainer ref={menuRef}>
                    {colors.map(color => (
                        <ColorButton 
                            key={color} 
                            color={color}
                            onClick={() => handleColorSelect(color)}
                        />   
                    ))}
                    <ActionButton 
                        key="no-color" 
                        onClick={() => handleColorSelect(null)}>Clear Color</ActionButton>
                    <ActionsContainer>
                        <ActionButton onClick={handleNewNote}>New Note</ActionButton>
                        <ActionButton onClick={handleGoToNotes}>Go to Notes</ActionButton>
                    </ActionsContainer>
                    <ActionButton onClick={() => setIsMenuOpen(false)}>Закрыть</ActionButton>

                </ColorPickerContainer>
                )}

        </CalendarContainer>
    );
};

export default Calendar;
