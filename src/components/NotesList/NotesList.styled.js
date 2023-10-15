import styled from 'styled-components';
import theme from 'constants/theme';
import { Link } from "react-router-dom";

export const NotesContainer = styled.div`
  width: 100%;
  padding: 20px;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const Header = styled.h1`
  text-align: center;
  color: ${theme.colors.yellow};
  margin: 0;
`;

export const SubText = styled.p`
  font-size: 12px;
  text-align: center;
  color: ${theme.colors.yellow};
`;

export const StyledLink = styled(Link)`

`;

export const NotesListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const NoteItem = styled.li`
  margin-bottom: 20px;
  background-color: ${theme.colors.lightGrey};
  border-radius: 4px;
  box-shadow: ${theme.effects.dropShadow};
  padding: 10px;
  cursor: pointer;
`;

export const NoteTitle = styled.h2`
  color: ${theme.colors.light};
`;

export const NoteContent = styled.p`
  color: ${theme.colors.light};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoteDate = styled.p`
  font-size: 10px;
  color: ${theme.colors.light};
`;

export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
`;
