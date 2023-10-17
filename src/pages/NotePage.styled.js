import styled from "styled-components";
import theme from "constants/theme";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 106px);
  padding: 10px;
`;

export const NoteTitle = styled.h1`
  margin-bottom: 5px;
  text-align: center;
  color: ${theme.colors.light};
`;

export const NoteContent = styled.p`
  flex-grow: 1;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
  
  background-color: ${theme.colors.lightGrey};
  border-radius: 5px;
  color: ${theme.colors.light};
  box-shadow: ${theme.effects.dropShadow};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: auto;
`;

export const StyledButton = styled.button`
  width: 50%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: white;
  box-shadow: ${theme.effects.dropShadow};

  &:first-child {
    margin-right: 5px;
    background-color: #dc3545;
  }

  &:last-child {
    background-color: #007bff;
  }
`;
