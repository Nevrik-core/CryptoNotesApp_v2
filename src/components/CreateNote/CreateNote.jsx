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

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", padding: "10px" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onMouseDown={handleMouseDown}
        style={{ marginBottom: "10px", padding: "10px", fontSize: "16px", }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onMouseDown={handleMouseDown}
        style={{ flexGrow: 1, marginBottom: "10px", padding: "10px", fontSize: "16px" }}
      />
      <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }}>Create note</button>
    </form>
  );
};

export default CreateNote;
