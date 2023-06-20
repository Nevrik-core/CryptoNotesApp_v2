import { collection, addDoc, getDocs, getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";

export const createNote = async (userId, note) => {
  const db = getFirestore();
  const notesCollection = collection(db, "users", userId, "notes");
  const createdAt = new Date();
  try {
    const docRef = await addDoc(notesCollection, { ...note, userId, createdAt });
    return { id: docRef.id, ...note, userId, createdAt }; 
  } catch (error) {
    console.error("Error saving note: ", error);
  }
};


export const fetchNotes = async (userId) => {
  const db = getFirestore();
  const notesCollection = collection(db, "users", userId, "notes");
  try {
    const snapshot = await getDocs(notesCollection);
    const notes = [];
    snapshot.forEach((doc) => {
      const noteData = doc.data();
      const createdAt = noteData.createdAt ? noteData.createdAt.toDate() : new Date();
      notes.push({ id: doc.id, ...noteData, createdAt });
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};


export const updateNote = async (userId, noteId, noteData) => {
  const db = getFirestore();
  const noteRef = doc(db, "users", userId, "notes", noteId);
  try {
    await updateDoc(noteRef, noteData);
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};

export const deleteNote = async (userId, noteId) => {
  const db = getFirestore();
  const noteRef = doc(db, "users", userId, "notes", noteId);
  try {
    await deleteDoc(noteRef);
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};
