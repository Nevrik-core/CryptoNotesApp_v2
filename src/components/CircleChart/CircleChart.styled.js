import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 20px;
  gap: 20px; // Відстань між колонками

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    // Адаптивні стилі для мобільних пристроїв
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto 0;
  input[type="text"],
  input[type="number"],
  input[type="range"],
  input[type="color"] {
    border-radius: 5px;
    margin-bottom: 5px;
  }
  
  // Медіаправила для мобільних пристроїв
  @media (max-width: 768px) {
    input[type="text"],
    input[type="number"],
    input[type="range"] {
      width: 100%; // Зменшуємо ширину до 60% від доступного простору
      margin: 0 auto; // Центруємо елементи
      margin-top: 0;
      
    }

    input[type="color"] {
      margin-top: 10px;  
      width: 50px; // Фіксована ширина для селекторів кольору
      height: 34px; // Збільшуємо висоту для кращої видимості
    }

    // Зменшуємо відступи між контрольними елементами
    > div {
      margin-bottom: 10px;
    }
  }
`;

export const CanvasWrapper = styled.div`
    position: relative;
`;

export const CustomCanvas = styled.canvas`
    position: relative;
    top: 0;
    left: 0;
    width: 600px;
    height: 600px;
    @media (max-width: 768px) {
        width: 320px;
        height: 320px;
}
`;

export const TextControl = styled.div`
    position: absolute;
    top: 150px;
    left: 50%;
    transform: scale(1.5);
`;



export const StyleWrapper = styled.div`
  // Додайте стилі для цього контейнера
`;

export const IttenImage = styled.img`
  position: absolute;
  bottom: 7%;
  right: 0.5%;
  width: 150px;
  @media (max-width: 768px) {
        display: none;
}
`;



export const AdjustmentsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  padding-bottom: 30px;
  top: 50%;
  
  input[type="color"],
  input[type="number"] {
            border-radius: 5px;
        }
  @media (max-width: 768px) {
    margin: 0;
    input[type="color"] {
            height: 40px;
            width: 100%;
            border-radius: 10px;
        }
  }
`;


// Add to your styled components
export const LegendWrapper = styled.div`
  position: absolute;
  top: 10%; // Adjust as needed
  right: 10%; // Adjust as needed
  background: white;
  border: 1px solid #000;
  padding: 5px;
  @media (max-width: 768px) {
    display: none;
  }
`;



export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  transform: scale(0.9);
  font-size: 14px;
  margin-bottom: 4px;
`;

export const ColorSwatch = styled.div`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border: 1px solid #000;
  margin-right: 10px;
`;


export const Label = styled.label`
    color: white;
    font-size: 14px;
    @media (max-width: 768px) {
        font-size: 14px;
    }
    
`

export const InputWrapper = styled.div`
    margin-bottom: 20px;
    input[type="color"] {
    width: 50px;
    height: 34px;
    margin-left: 20px;
    }
    input[type="text"],
    input[type="range"],
    input[type="number"]   {
        margin-right: 20px;
    }
    @media (max-width: 768px) {
        margin-bottom: 10px;
        input[type="color"] {
            margin-left: 0;
            width: 100%;
        }
        input[type="number"],
        input[type="range"],
        input[type="text"]   {
        margin-right: 0px;
        margin-bottom: 5px;
    }
    }

`


