import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNote = ({ onCreate, userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
   const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  onCreate({ title, content });
  setTitle("");
  setContent("");
  navigate("/notes");
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">Создать заметку</button>
    </form>
  );
};

export default CreateNote;
