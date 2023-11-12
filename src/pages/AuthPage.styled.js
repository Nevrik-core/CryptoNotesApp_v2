import styled from "styled-components";
import theme from "constants/theme";

export const AuthPageConteiner = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40;
    color: #010101;
`

export const StyledAuthButton = styled.button`
    background-color: ${theme.colors.blue};
    color: #ffffff;
    font-size: 18px;
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
`