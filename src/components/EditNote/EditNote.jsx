import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Редактировать заметку</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditNote;
