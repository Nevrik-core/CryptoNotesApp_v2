import React, { useState, useEffect } from "react";


import { auth } from "../services/firebase/config";
import { createNote, fetchNotes, deleteNote } from "../services/firebase/notes";
import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";

export const App = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const fetchedNotes = await fetchNotes(user.uid);
        setNotes(fetchedNotes);
      }
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  const handleNoteCreated = async (note) => {
    try {
      const newNote = await createNote(auth.currentUser.uid, note);
      setNotes([...notes, newNote]);
      setShouldRefresh(true);
    } catch (error) {
      console.error("Error creating note: ", error);
    }
  };

  const handleNoteDeleted = (userId, noteId) => {
  deleteNote(userId, noteId)
    .then(() => {
      setNotes(notes.filter((note) => note.id !== noteId));
    })
    .catch((error) => {
      console.error("Error deleting note: ", error);
    });
  };
  
   const handleDeleteClick = (userId, noteId) => {
    setNoteToDelete({ userId, noteId });
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const { userId, noteId } = noteToDelete;
    deleteNote(userId, noteId)
      .then(() => {
        setNotes(notes.filter((note) => note.id !== noteId));
      })
      .catch((error) => {
        console.error("Error deleting note: ", error);
      });
    setModalOpen(false);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <>
      {user ? (
        <HomePage
          notes={notes}
          handleNoteCreated={handleNoteCreated}
          user={user}
          setUser={setUser}
          onDelete={handleDeleteClick}
          setNotes={setNotes}
        />
      ) : (
        <AuthPage />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default App;
