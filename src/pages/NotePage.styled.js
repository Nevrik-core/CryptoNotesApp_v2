import styled from "styled-components";
import theme from "constants/theme";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px - 50px);
  padding: 10px;
`;

export const NoteTitle = styled.h1`
  text-align: center;
  margin: 0;
  margin-bottom: 5px;
  color: ${theme.colors.light};
`;

export const NoteContent = styled.p`
  flex-grow: 1;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  background-color: ${theme.colors.lightGrey};
  border-radius: 5px;
  color: ${theme.colors.light};
  box-shadow: ${theme.effects.dropShadow};
  overflow-wrap: break-word;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const StyledButton = styled.button`
  width: 50%;
  padding: 10px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: ${theme.effects.dropShadow};

  &:first-child {
    margin-right: 5px;
    background-color: #dc3545;
  }

  &:last-child {
    margin-left: 5px;
    background-color: #007bff;
  }
`;
