import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useWordAndCharCount from "hooks/useWordAndCharCount";

import { FormWrapper, StyledInput, StyledTextarea, StyledInfo,SubmitButton } from "./CreateNote.styled";

const CreateNote = ({ onCreate, userId }) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const { content, setContent, charCount, wordCount, handleContentChange } = useWordAndCharCount();

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, content });
    setTitle("");
    setContent("");
    navigate("/notes");
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <FormWrapper onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onMouseDown={handleMouseDown}
        />
        <StyledTextarea
          placeholder="Content"
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          onMouseDown={handleMouseDown}
        />
        <StyledInfo>Characters: {charCount} | Words: {wordCount}</StyledInfo>
        <SubmitButton type="submit">Create note</SubmitButton>
      </FormWrapper>
    </div>
  );
};

export default CreateNote;
