import React, { forwardRef } from "react";
import { ColorPickerContainer, ColorButton, ActionsContainer, ActionButton } from "./ColorPicker.styled";

const ColorPicker = forwardRef(({colors, handleColorSelect, setIsMenuOpen, selectedColors}, ref) => {

    

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
            <ActionsContainer>
                <ActionButton onClick={()=>(null)}>New Note</ActionButton>
                <ActionButton onClick={()=>(null)}>Go to notes</ActionButton>
            </ActionsContainer>
            <ActionButton onClick={() => setIsMenuOpen(false)}>Close</ActionButton>
        </ColorPickerContainer>
            );
});

export default ColorPicker;