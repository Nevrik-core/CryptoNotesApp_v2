import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import theme from "constants/theme";

const NotesList = ({ notes, onDelete, userId }) => {
  const navigate = useNavigate();
  const userNotes = notes
    .filter((note) => note.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleClick = (noteId) => {
    navigate(`/view/${noteId}`);
  };

 return (
  <div style={{ width: "100%", padding: "20px", overflowX: "hidden", boxSizing: "border-box" }}>
    <h1 style={{ textAlign: "center", color: theme.colors.dark, margin: "0" }}>Welcome to the encrypted notes</h1>
    <p style={{fontSize: "12px", textAlign: "center", color: theme.colors.dark}}>All your notes will be encrypted, and only you can see the decrypted version.</p>
    <Link to="/create"></Link>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {userNotes.map((note) => (
        <li
          key={note.id}
          onClick={() => handleClick(note.id)}
          style={{
            marginBottom: "20px",
    backgroundColor: theme.colors.yellow,
    borderRadius: "4px",
    boxShadow: theme.effects.dropShadow,
    padding: "10px",
    cursor: "pointer",
          }}
        >
          <h2 style={{color: "#000000"}}>{note.title}</h2>
          <p style={{ 
            color: theme.colors.dark,
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis" 
          }}>
            {note.content}
          </p>
          <p style={{fontSize: "10px", color: theme.colors.dark}}>{note.createdAt ? `${note.createdAt.toDateString()} ${note.createdAt.toLocaleTimeString()}` : "N/A"}</p>
          <button style={{backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px'}} onClick={(e) => { e.stopPropagation(); onDelete(userId, note.id) }}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

};

export default NotesList;
