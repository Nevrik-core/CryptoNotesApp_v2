import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { signOutUser } from "../services/firebase/auth";
import NotesList from "components/NotesList/NotesList";
import CreateNote from "components/CreateNote/CreateNote";
import NotePage from "./NotePage";
import EditNote from "components/EditNote/EditNote";
import { updateNote, fetchNotes } from "../services/firebase/notes";
import { FiLogOut } from "react-icons/fi";
import Calendar from "components/Calendar/Calendar";


import { Navbar, BottomMenu, BottomStyledNavLink, TopStyledNavLink, SignOutButton, ContentContainer } from "./HomePage.styled";
import { TbCalendarStar, TbNotes, TbSettings } from 'react-icons/tb';

export const HomePage = ({
  notes,
  onUpdate,
  onDelete,
  handleNoteCreated,
  user,
  setUser,
  setNotes,
}) => {
  const handleNoteUpdated = async (noteId, noteData) => {
    await updateNote(user.uid, noteId, noteData);
    const updatedNotes = await fetchNotes(user.uid);
    setNotes(updatedNotes);
  };


  return (
    <>
      <BottomMenu>
        <BottomStyledNavLink to="/notes"><TbNotes size={24} /></BottomStyledNavLink>
        <BottomStyledNavLink to="/calendar"><TbCalendarStar size={24} /></BottomStyledNavLink>
        <BottomStyledNavLink to="/settings"><TbSettings size={24} /></BottomStyledNavLink>
      </BottomMenu>

      <Navbar>
        <TopStyledNavLink to="/notes">Notes</TopStyledNavLink>
        <TopStyledNavLink to="/create">New note</TopStyledNavLink>
        <SignOutButton
          onClick={signOutUser}>
          <FiLogOut />
        </SignOutButton>
      </Navbar>

      <ContentContainer>
        <Routes>
        <Route path="/calendar" element={<Calendar userId={user.uid}/>} />

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
          <Route path="/view/:noteId" element={<NotePage notes={notes} />} />
          <Route
            path="/edit/:noteId"
            element={<EditNote notes={notes} onUpdate={handleNoteUpdated} />}
          />
        </Routes>
      </ContentContainer>
    </>
  );
};

export default HomePage;
