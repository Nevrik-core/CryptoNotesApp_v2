import React, { forwardRef, useState, useEffect, useCallback } from "react";
import { ColorPickerContainer, ColorButton, ActionsContainer, ActionButton, StyledTextarea } from "./ColorPicker.styled";
import { debounce } from 'lodash';
import { saveQuickNoteForDate, getQuickNoteForDate } from "services/firebase/notes";


const ColorPicker = forwardRef(({userId, date, colors, initialNote, handleColorSelect, setIsMenuOpen, selectedColors}, ref) => {
    const [note, setNote] = useState(initialNote);
    
    const debouncedSaveNote = useCallback(
        debounce(async (note) => {
            await saveQuickNoteForDate(userId, date, note);
        }, 1000),
        [userId, date] // Залежності, які будуть оновлювати debounced функцію
    );

    useEffect(() => {
    // Очищення debounce при зміні userId або date, або коли компонент демонтується
    return () => debouncedSaveNote.cancel();
    }, [debouncedSaveNote]);


    const handleNoteChange = (event) => {
        const newNote = event.target.value;
        setNote(newNote);
        debouncedSaveNote(newNote);
    };

    useEffect(() => {
        const loadNote = async () => {
            const existingNote = await getQuickNoteForDate(userId, date);
            setNote(existingNote || ""); // Встановлюємо існуючу нотатку або пустий рядок
        };
        
        loadNote();
    }, [userId, date]);

    return (
        <ColorPickerContainer ref={ref}>
            {colors.map(color => (
                <ColorButton
                key={color}
                color={color}
                data-isselected={selectedColors.includes(color)}
                onClick={() => handleColorSelect(color)}
                />
            ))}
            <StyledTextarea 
                type="text" 
                value={note} 
                onChange={handleNoteChange} 
                maxLength={46}
                placeholder="Quick note"
            />
            <ActionsContainer>
                <ActionButton onClick={()=>(null)}>New Note</ActionButton>
                <ActionButton onClick={()=>(null)}>Go to notes</ActionButton>
            </ActionsContainer>
            <ActionButton onClick={() => setIsMenuOpen(false)}>Close</ActionButton>
        </ColorPickerContainer>
            );
});

export default ColorPicker;