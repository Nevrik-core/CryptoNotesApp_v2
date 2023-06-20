import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const NotesList = ({ notes, onDelete, userId }) => {
  const navigate = useNavigate();
  const userNotes = notes
    .filter((note) => note.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  console.log(userNotes);
   const handleClick = (noteId) => {
     navigate(`/view/${noteId}`);
     
  };
  
  
  return (
    <div>
      <h1>Notes</h1>
      <Link to="/create">
        <button>Создать заметку</button>
      </Link>
      <ul>
        {userNotes.map((note) => (
          <li key={note.id} onClick={() => handleClick(note.id)}>
            <h2>{note.title}</h2>
            <p>{note.content.substring(0, 50)}...</p>
            <p>{note.createdAt ? note.createdAt.toDateString() : 'N/A'}</p>
            <button onClick={(e) => { e.stopPropagation(); onDelete(userId, note.id) }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
