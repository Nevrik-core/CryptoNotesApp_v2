import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useWordAndCharCount from 'hooks/useWordAndCharCount';

import {
  EditWrapper,
  EditHeader,
  StyledInput,
  StyledTextarea,
  StyledInfo,
  ButtonGroup,
  BackButton,
  SaveButton
} from './EditNote.styled';



const EditNote = ({ notes, onUpdate }) => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState('');

  const { content, setContent, wordCount, charCount, handleContentChange } = useWordAndCharCount();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      handleContentChange(note.content);
    }
  }, [note, handleContentChange]);

  const handleSave = () => {
    onUpdate(noteId, { title, content });
    navigate(`/view/${noteId}`);
  };

  const handleBack = () => {
    navigate("/notes");
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <EditWrapper>
      <EditHeader>Edit note</EditHeader>
      <StyledInput
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <StyledTextarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></StyledTextarea>
        <StyledInfo>Characters: {charCount} | Words: {wordCount}</StyledInfo>
      <ButtonGroup style={{ display: 'flex' }}>
        <BackButton onClick={handleBack}>Back</BackButton>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ButtonGroup>
    </EditWrapper>
  );
};

export default EditNote;
