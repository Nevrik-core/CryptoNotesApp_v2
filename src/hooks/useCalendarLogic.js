import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllColors, setColorForDate } from "services/firebase/notes";

const useCalendarLogic = (userId) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dayColors, setDayColors] = useState({});
    const location = useLocation();

    const handleNextMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleDayClick = (e, day) => {
        e.preventDefault();
        setSelectedDate(day);
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


    const handleColorSelect = async (color) => {
        setDayColors(prevColors => {
            const currentColors = prevColors[selectedDate.toDateString()] || [];
            let newColors;
            if (currentColors.includes(color)) {
                newColors = currentColors.filter(c => c !== color);
            } else {
                newColors = [...currentColors, color]
            }
            setColorForDate(userId, selectedDate.toDateString(), newColors);
            return { ...prevColors, [selectedDate.toDateString()]: newColors };
        })
    }

    useEffect(() => {
        if (location.pathname === '/calendar') {
            const interval = setInterval(() => setCurrentDate(new Date()), 6000000);
            return () => clearInterval(interval);
        }
    }, [location]);

    useEffect(() => {
        const loadColors = async () => {
            const loadedColors = await getAllColors(userId);
            setDayColors(loadedColors);
        };
        loadColors();
    }, [userId]);

    return {
        currentDate,
        handlePrevMonth,
        handleNextMonth,
        selectedDate,
        handleDayClick,
        isMenuOpen,
        setIsMenuOpen,
        dayColors,
        daysOfMonth,
        handleColorSelect
    };
};

export default useCalendarLogic;