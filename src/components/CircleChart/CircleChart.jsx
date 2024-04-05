import React, { useState, useEffect, useRef } from 'react';
import CircleType from 'circletype';
import Draggable from 'react-draggable';

import itten from './jpeg/itten.jpg'
import { Wrapper, CanvasWrapper, CustomCanvas, Label, ControlsWrapper, IttenImage, StyleWrapper, AdjustmentsWrapper, LegendWrapper, LegendItem, ColorSwatch, InputWrapper } from './CircleChart.styled';


const CircleChart = () => {
    const defaultColors = [
    '#f9c633', '#f08e33', '#e33d32', '#c73e7e',
    '#444e99', '#2a6fb0', '#46905d', '#8cb925'
    ];
    // const defaultColors = [
    // '#e33d32', '#c73e7e', '#444e99', '#2a6fb0',
    // '#46905d', '#8cb925', '#f9c633', '#f08e33'
    // ];
  const [sectors, setSectors] = useState(() => {
  // Спробуйте отримати збережені сектори з localStorage або встановіть значення за замовчуванням
  const savedSectors = localStorage.getItem('sectors');
  return savedSectors ? JSON.parse(savedSectors) : Array.from({ length: 8 }, (_, i) => ({
    divisions: 10, 
    color: defaultColors[i], 
    name: `Сектор ${i + 1}`
  }));
});

const [backgroundColor, setBackgroundColor] = useState(() => {
  // Отримайте збережений колір фону або встановіть значення за замовчуванням
  return localStorage.getItem('backgroundColor') || '#282728';
});

const [textColor, setTextColor] = useState(() => {
  // Отримайте збережений колір тексту або встановіть значення за замовчуванням
  return localStorage.getItem('textColor') || '#FFFFFF'; // Змінено на #FFFFFF для кращої видимості
});

const [borderColor, setBorderColor] = useState(() => {
  // Отримайте збережений колір обведення або встановіть значення за замовчуванням
  return localStorage.getItem('borderColor') || '#282728';
});

const [borderWidth, setBorderWidth] = useState(() => {
  // Отримайте збережену ширину обведення або встановіть значення за замовчуванням
  const savedWidth = localStorage.getItem('borderWidth');
  return savedWidth ? Number(savedWidth) : 2;
});
  const canvasRef = useRef(null);
  const maxRadius = 200; // Максимальний радіус круга
  const divisionWidth = 20;  // Мінімальний радіус круга
  const textRef = useRef(null); 
      
  
  

  

  useEffect(() => {
  // Читання збережених даних при завантаженні компонента
  const loadedSectors = JSON.parse(localStorage.getItem('sectors')) || sectors;
  const loadedBackgroundColor = localStorage.getItem('backgroundColor') || '#282728';
  const loadedBorderColor = localStorage.getItem('borderColor') || '#282728';
  const loadedBorderWidth = localStorage.getItem('borderWidth') || '2';

  // Оновлення стану компонента збереженими даними
  setSectors(loadedSectors);
  setBackgroundColor(loadedBackgroundColor);
  setBorderColor(loadedBorderColor);
  setBorderWidth(loadedBorderWidth);
}, []);

  useEffect(() => {
    // Зберігання даних при їх зміні
    localStorage.setItem('sectors', JSON.stringify(sectors));
    localStorage.setItem('backgroundColor', backgroundColor);
    localStorage.setItem('borderColor', borderColor);
    localStorage.setItem('borderWidth', borderWidth);
  }, [sectors, backgroundColor, borderColor, borderWidth]);
    
    
  useEffect(() => {
    drawChart();
  }, [sectors, backgroundColor, borderWidth, borderColor]);  
    
  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищення canvas
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Заливка фону

    ctx.save(); // Збереження поточного стану контексту

    // Переміщення початкової точки координат в центр канвасу
    ctx.translate(centerX, centerY);
    // Поворот на 45 градусів проти годинникової стрілки
    ctx.rotate(-90 * Math.PI / 180);
    // Повернення початкової точки координат назад
    ctx.translate(-centerX, -centerY);

    sectors.forEach((sector, sectorIndex) => {
      const sectorAngle = 2 * Math.PI / sectors.length;
      const startAngle = sectorAngle * sectorIndex;
      const endAngle = startAngle + sectorAngle;

      for (let i = 1; i <= sector.divisions; i++) {
        const innerRadius = (maxRadius / sectors.length) * i;
        const outerRadius = innerRadius + (maxRadius / sectors.length);
        ctx.beginPath();
        ctx.arc(centerX, centerY, innerRadius, startAngle, endAngle, false);
        ctx.arc(centerX, centerY, outerRadius, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = sector.color;
        ctx.fill();
        
        // Додавання обведення для кожного сектора
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.stroke();
      }
    });

    ctx.restore(); // Відновлення стану контексту до збереженого, щоб не впливати на наступні операції малювання
};




  const handleDivisionChange = (index, value) => {
    const updatedSectors = sectors.map((sector, i) => 
      i === index ? { ...sector, divisions: Math.max(0, Math.min(11, Number(value))) } : sector
    );
    setSectors(updatedSectors);
  };

  const handleColorChange = (index, color) => {
    const updatedSectors = sectors.map((sector, i) => 
      i === index ? { ...sector, color: color } : sector
    );
      
    setSectors(updatedSectors);
  };

  const handleNameChange = (index, newName) => {
  const updatedSectors = sectors.map((sector, i) =>
    i === index ? { ...sector, name: newName } : sector
  );
  setSectors(updatedSectors);
};

  return (
    <Wrapper>  
      {/* Обгортка для повзунків і зображення */}
        <ControlsWrapper >
        {/* Блок з повзунками */}
            <div>
                {sectors.map((sector, index) => (
                <InputWrapper key={index} >
                    <Label>
                    <input
                        type="text"
                        value={sector.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        />
                    <input
                        type="range"
                        value={sector.divisions}
                        onChange={(e) => handleDivisionChange(index, e.target.value)}
                        min="1"
                        max="11"
                        
                    />
                    <input
                        type="number"
                        value={sector.divisions}
                        onChange={(e) => handleDivisionChange(index, e.target.value)}
                        min="1"
                        max="11"
                        
                    />
                    </Label>
    
                    
                    <input
                        type="color"
                        value={sector.color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        
                    />
                   
                </InputWrapper>
                ))}
            </div>
        </ControlsWrapper>
        <CanvasWrapper>
            <CustomCanvas ref={canvasRef} width="700" height="700" />
            {/* <TextControl ref={textRef} style={{ */}
                
                {/* color: textColor // Застосуваня кольору тексту */}
            {/* }}> */}
                {/* | Сектfssdfор 1  |  Сектdsfsdfор 2   |  Сектfsdfdfsdор 3   |   Секfsdfsтор 4 | Секdsafsdfтор 5 | Сеdasfdfктор 6 | Секfsdfsdfтор 7 | Секfsdfsdfтор8    */}
            {/* </TextControl> */}
        </CanvasWrapper> 
        <StyleWrapper>
            {/* Зображення справа від блоку з повзунками */}
            
              <AdjustmentsWrapper>
                
                <span style={{ color: '#FFFFFF' }}>Змінити фон</span>
                <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} style={{ marginBottom: '40px', marginTop: '10px' }}/>
                  
                <span style={{ color: '#FFFFFF' }}>Колір обведення</span>
                <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} style={{ marginBottom: '40px', marginTop: '10px' }}/> 
                <span style={{ color: '#FFFFFF' }}>Ширина обведення</span>
                <input type="range" value={borderWidth} onChange={e => setBorderWidth(e.target.value)} min="0" max="24" style={{ marginTop: '10px' }}/> 
                <input type="number" value={borderWidth} onChange={e => setBorderWidth(e.target.value)} min="0" max="24" /> 
                 
            </AdjustmentsWrapper>    
        </StyleWrapper>
        <Draggable>
              <IttenImage src={itten} alt="Custom Image" />
        </Draggable>
        <Draggable>
            <LegendWrapper>
                {sectors.map((sector, index) => (
                <LegendItem key={index}>
                    <ColorSwatch color={sector.color} />
                    <span>{sector.name}</span>
                </LegendItem>
                ))}
            </LegendWrapper>
        </Draggable>       
    </Wrapper> 
   
  );
};

export default CircleChart;
