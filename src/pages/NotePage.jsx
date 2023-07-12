import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import theme from 'constants/theme';

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
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 60px)", padding: "10px" }}>
            <h1 style={{ textAlign: "center", margin: 0, marginBottom: "5px", color: theme.colors.light }}>{selectedNote.title}</h1>
        <p style={{
          flexGrow: 1,
          marginBottom: "10px",
          padding: "10px",
          fontSize: "16px",
          backgroundColor: theme.colors.lightGrey,
          borderRadius: "5px",
          color: theme.colors.light,
          boxShadow: theme.effects.dropShadow,
          overflowWrap: "break-word"
        }}>{selectedNote.content}</p>
            <div style={{ display: 'flex' }}>
          <button onClick={handleBack} style={{
            width: "50%",
            marginRight: "5px",
            padding: "10px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            boxShadow: theme.effects.dropShadow,
            
          }}>Back</button>
                <button onClick={handleEdit} style={{ width: "50%", marginLeft: "5px", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", boxShadow: theme.effects.dropShadow }}>Edit note</button>
            </div>
        </div>
    );
};

export default NotePage;
