import React, { useEffect, useRef } from 'react';
import { CalendarContainer, Overlay } from './Calendar.styled';

import CalendarHeader from './CalendarHeader';
import DaysOfWeek from './DaysOfWeek';
import useCalendarLogic from 'hooks/useCalendarLogic';
import MonthGrid from './MonthGrid';
import ColorPicker from './ColorPicker';



const Calendar = ({ userId }) => {
    
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
        'red', 'tomato', 'orange', 'yellow', 'green', 'cornflowerblue', 'blue', 'indigo', 'violet', 'black', 
        
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

    


    return (
        <CalendarContainer>
            {isMenuOpen && <Overlay data-isopen={isMenuOpen} onClick={() => setIsMenuOpen(false)} />}
            < CalendarHeader
                currentDate={currentDate}
                onNextMonth={handleNextMonth}
                onPrevMonth={handlePrevMonth}
            />
            <DaysOfWeek/>
            <MonthGrid
                daysOfMonth={daysOfMonth}
                handleDayClick={handleDayClick}
                currentDate={currentDate}
                dayColors={dayColors}
            />
            {isMenuOpen && <ColorPicker
                ref={menuRef}
                colors={colors}
                selectedDate={selectedDate}
                handleColorSelect={handleColorSelect}
                setIsMenuOpen={setIsMenuOpen}
                selectedColors={dayColors[selectedDate.toDateString()] || []} />}

        </CalendarContainer>
    );
};

export default Calendar;
