import React from "react";
import { useNavigate } from "react-router-dom";
import { NotesContainer, Header, SubText, StyledLink, NotesListContainer, NoteItem, NoteTitle, NoteContent, NoteDate, DeleteButton } from './NotesList.styled';


const NotesList = ({ notes, onDelete, userId }) => {
  const navigate = useNavigate();
  const userNotes = notes
    .filter((note) => note.userId === userId)
    .map(note => ({...note, createdAt: new Date(note.createdAt)}))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleClick = (noteId) => {
    navigate(`/view/${noteId}`);
  };

 return (
  <NotesContainer>
    <Header>Welcome to the encrypted notes</Header>
    <SubText>All your notes will be encrypted, and only you can see the decrypted version.</SubText>
    <StyledLink to="/create"></StyledLink>
    <NotesListContainer>
      {userNotes.map((note) => (
        <NoteItem
          key={note.id}
          onClick={() => handleClick(note.id)}
        >
          <NoteTitle>{note.title}</NoteTitle>
          <NoteContent>{note.content}</NoteContent>
          <NoteDate>{note.createdAt ? `${note.createdAt.toDateString()} ${note.createdAt.toLocaleTimeString()}` : "N/A"}</NoteDate>
          <DeleteButton onClick={(e) => { e.stopPropagation(); onDelete(userId, note.id) }}>Delete</DeleteButton>
        </NoteItem>
      ))}
    </NotesListContainer>
  </NotesContainer>
);

};

export default NotesList;
