import { styled } from "styled-components";

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    padding: 10px;
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

export const SubmitButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
`