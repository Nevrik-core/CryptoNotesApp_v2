import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NotePage = ({ notes }) => {
    const navigate = useNavigate();
    const { noteId } = useParams();
     const selectedNote = notes.find((n) => n.id === noteId);

  const handleBack = () => {
    navigate('/notes');
  };

  const handleEdit = () => {
      navigate(`/edit/${selectedNote.id}`);
      
  };

  if (!selectedNote) {
    return <div>Loading...</div>;
  }
    
  return (
    <div>
      <h1>{selectedNote.title}</h1>
      <p>{selectedNote.content}</p>
      <button onClick={handleBack}>Назад</button>
      <button onClick={handleEdit}>Редактировать</button>
    </div>
  );
};

export default NotePage;
