import React, { useEffect, useState, useRef } from 'react';
import { CalendarContainer, Overlay } from './Calendar.styled';
import { getNotesForMonth } from 'services/firebase/notes';

import CalendarHeader from './CalendarHeader';
import DaysOfWeek from './DaysOfWeek';
import useCalendarLogic from 'hooks/useCalendarLogic';
import MonthGrid from './MonthGrid';
import ColorPicker from './ColorPicker';



const Calendar = ({ userId }) => {
    const [dayNotes, setDayNotes] = useState({});
    const [currentMonth, setCurrentMonth] = useState('');

    const {
        currentDate,
        handleNextMonth,
        handlePrevMonth,
        daysOfMonth,
        selectedDate,
        isMenuOpen,
        dayColors,
        setIsMenuOpen,
        handleDayClick,
        handleColorSelect
    } = useCalendarLogic(userId);


    const colors = [
        'red', 'tomato', 'orange', 'yellow', 'green', 'cornflowerblue', 'indigo', 'violet', 'black', 
        
    ];
    
    // const handleNewNote = () => {
    //     setIsMenuOpen(false); 
    // };
    
    // const handleGoToNotes = () => {
    //     setIsMenuOpen(false); 
    // };

    
   
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

    useEffect(() => {
        const adjustCalendarHeight = () => {
            const calendar = document.querySelector('#calendar-container');
            const browserUIHeight = 120; 
            const windowHeight = window.innerHeight;
            const adjustedHeight = windowHeight - browserUIHeight;
            calendar.style.height = `${adjustedHeight}px`;
        };

        window.addEventListener('load', adjustCalendarHeight);
        window.addEventListener('resize', adjustCalendarHeight);

        adjustCalendarHeight();

        return () => {
            window.removeEventListener('load', adjustCalendarHeight);
            window.removeEventListener('resize', adjustCalendarHeight);
        };
    }, []);    

    useEffect(() => {
    // Форматуємо поточну дату для отримання рядка місяця та року
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    if (`${year}-${month}` !== currentMonth) {
        const fetchNotesForMonth = async () => {
            const monthNotes = await getNotesForMonth(userId, year, month);
            setDayNotes(monthNotes);
        };

        fetchNotesForMonth();
        setCurrentMonth(`${year}-${month}`);
    }
}, [currentDate, userId, currentMonth]);

    return (
        <CalendarContainer id="calendar-container">
            {isMenuOpen && <Overlay data-isopen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />}
            < CalendarHeader
                currentDate={currentDate}
                onNextMonth={handleNextMonth}
                onPrevMonth={handlePrevMonth}
            />
            <DaysOfWeek/>
            <MonthGrid
                dayNotes={dayNotes}
                daysOfMonth={daysOfMonth}
                handleDayClick={handleDayClick}
                currentDate={currentDate}
                dayColors={dayColors}
            />
            {isMenuOpen && <ColorPicker
                userId={userId}
                ref={menuRef}
                colors={colors}
                date={selectedDate}
                initialNote={dayNotes[selectedDate.toDateString()] || ""}
                handleColorSelect={handleColorSelect}
                setIsMenuOpen={setIsMenuOpen}
                selectedColors={dayColors[selectedDate.toDateString()] || []} />}

        </CalendarContainer>
    );
};

export default Calendar;
