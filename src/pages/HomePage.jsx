import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import { signOutUser } from "../services/firebase/auth";
import NotesList from "components/NotesList/NotesList";
import CreateNote from "components/CreateNote/CreateNote"; 
import NotePage from "./NotePage";
import EditNote from "components/EditNote/EditNote";
import { updateNote, fetchNotes } from "../services/firebase/notes";



export const HomePage = ({ notes, onUpdate, onDelete, handleNoteCreated, user, setUser, setNotes }) => {

  const handleNoteUpdated = async (noteId, noteData) => {
  await updateNote(user.uid, noteId, noteData);
  const updatedNotes = await fetchNotes(user.uid);
  setNotes(updatedNotes);
};

  return (
    <>
      <nav>
        <Link to="/notes">Заметки</Link>
        <Link to="/create">Создать заметку</Link>
        <button onClick={signOutUser}>Выйти</button>
      </nav>
      <Routes>
        <Route
          path="/notes"
          element={
            <NotesList
                notes={notes}
                onUpdate={onUpdate}
                onDelete={onDelete}
                userId={user.uid}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateNote
              onCreate={(note) => {
                handleNoteCreated(note);
              }}
              userId={user.userId}
              onCancel={() => setUser(null)}
            />
          }
        />
        <Route path="/view/:noteId" element=<NotePage notes={notes} /> />
        <Route path="/edit/:noteId" element={<EditNote notes={notes} onUpdate={handleNoteUpdated} />} />
      </Routes>
    </>
  );
};

export default HomePage;
