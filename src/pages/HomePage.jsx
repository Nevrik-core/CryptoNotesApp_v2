import React from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { signOutUser } from "../services/firebase/auth";
import NotesList from "components/NotesList/NotesList";
import CreateNote from "components/CreateNote/CreateNote";
import NotePage from "./NotePage";
import EditNote from "components/EditNote/EditNote";
import { updateNote, fetchNotes } from "../services/firebase/notes";
import { FiLogOut } from "react-icons/fi";

import theme from "constants/theme";

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

  const location = useLocation();

  return (
    <>
      <div
        style={{
          backgroundColor: theme.colors.blue,
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <NavLink
          to="/notes"
          style={{
            textDecoration: "none",
            color: location.pathname === "/notes" ? "#FFFFFF" : "#ffffff9d",
            marginRight: "auto",
            fontWeight: location.pathname === "/notes" ? "bold" : "normal",
            transition: "font-weight 0.3s ease-in-out",
          }}
        >
          Notes
        </NavLink>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <NavLink
            to="/create"
            style={{
              textDecoration: "none",
              color: location.pathname === "/create" ? "#FFFFFF" : "#ffffff9d",
              fontWeight: location.pathname === "/create" ? "bold" : "normal",
              transition: "font-weight 0.3s ease-in-out",
            }}
          >
            New note
          </NavLink>
        </div>
        <button
          onClick={signOutUser}
          style={{
            color: "#ffffff",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          <FiLogOut />
        </button>
      </div>
      <div style={{ height: "calc(100vh - 40px)", overflow: "auto" }}>
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
          <Route path="/view/:noteId" element={<NotePage notes={notes} />} />
          <Route
            path="/edit/:noteId"
            element={<EditNote notes={notes} onUpdate={handleNoteUpdated} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default HomePage;
