import { styled } from "styled-components";
import theme from "constants/theme";

export const EditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    padding: 10px;
`

export const EditHeader = styled.h1`
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
    color: ${theme.colors.light}
`

export const StyledInput = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
`

export const StyledTextarea = styled.textarea`
    flex-grow: 1;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
`

export const StyledInfo = styled.span`
    color: gray;
    margin-bottom: 10px;
`

export const ButtonGroup = styled.div`
    display: flex;
`

export const BackButton = styled.button`
    flex-grow: 1;
    margin-right: 5px;
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
`

export const SaveButton = styled.button`
    flex-grow: 1;
    margin-right: 5px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
`