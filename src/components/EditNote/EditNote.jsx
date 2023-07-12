import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import theme from 'constants/theme';

const EditNote = ({ notes, onUpdate }) => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === noteId);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

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
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", padding: "10px" }}>
      <h1 style={{ textAlign: "center", margin: 0, marginBottom: "5px", color: theme.colors.light }}>Edit note</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px", fontSize: "16px" }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ flexGrow: 1, marginBottom: "10px", padding: "10px", fontSize: "16px" }}
      ></textarea>
      <div style={{ display: 'flex' }}>
        <button onClick={handleBack} style={{ flexGrow: 1, marginRight: "5px", padding: "10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }}>Back</button>
        <button onClick={handleSave} style={{ flexGrow: 1, marginLeft: "5px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px" }}>Save</button>
      </div>
    </div>
  );
};

export default EditNote;
