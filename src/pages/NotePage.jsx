import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageContainer, NoteTitle, NoteContent, ButtonsContainer, StyledButton } from './NotePage.styled';

const NotePage = ({ notes }) => {
    
    
    const navigate = useNavigate();
    const { noteId } = useParams();
    
    if (!Array.isArray(notes)) {
        return <div>Loading...</div>;
    }
    const selectedNote = notes.find((n) => n.id === noteId);

    const handleBack = () => {
        navigate('/notes');
    };

    const handleEdit = () => {
        navigate(`/edit/${selectedNote.id}`);
    };

    
    return (
        <PageContainer >
            <NoteTitle >{selectedNote.title}</NoteTitle>
            <NoteContent >{selectedNote.content}</NoteContent>
            <ButtonsContainer >
                <StyledButton onClick={handleBack} >Back</StyledButton>
                <StyledButton onClick={handleEdit} >Edit note</StyledButton>
            </ButtonsContainer>
        </PageContainer>
    );
};

export default NotePage;
