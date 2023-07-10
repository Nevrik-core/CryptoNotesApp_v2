import { collection, addDoc, getDocs, getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_ENCRYPTION_KEY;

// Function to encrypt the note content
const getEncryptedNote = (noteContent, key) => {
  const cipherParams = CryptoJS.TripleDES.encrypt(noteContent, key);
  return cipherParams.toString();
};

// Function to decrypt the note content
const getDecryptedNote = (cipherText, key) => {
  const bytes = CryptoJS.TripleDES.decrypt(cipherText, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Function to create a new note
export const createNote = async (userId, note) => {
  // Get reference to Firestore database
  const db = getFirestore();
  // Define the notes collection for the current user
  const notesCollection = collection(db, "users", userId, "notes");
  const createdAt = new Date();
  // Encrypt the note content
  const encryptedContent = getEncryptedNote(note.content, key);
  
  try {
    // Add a new document to the notes collection of the current user
    const docRef = await addDoc(notesCollection, { ...note, content: encryptedContent, userId, createdAt });
    return { id: docRef.id, ...note, userId, createdAt }; 
  } catch (error) {
    console.error("Error saving note: ", error);
  }
};

// Function to fetch all notes of the current user
export const fetchNotes = async (userId) => {
  const db = getFirestore();
  const notesCollection = collection(db, "users", userId, "notes");
  try {
    // Get all documents from the notes collection of the current user
    const snapshot = await getDocs(notesCollection);
    const notes = [];
    snapshot.forEach((doc) => {
      const noteData = doc.data();
      const decryptedContent = getDecryptedNote(noteData.content, key);
      // If the document data has a createdAt field, convert it to a Date object, else use current time
      const createdAt = noteData.createdAt ? noteData.createdAt.toDate() : new Date();
      notes.push({ id: doc.id, ...noteData, content: decryptedContent, createdAt });
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes: ", error);
  }
};

// Function to update a note
export const updateNote = async (userId, noteId, noteData) => {
  const db = getFirestore();
  const noteRef = doc(db, "users", userId, "notes", noteId);
  const encryptedContent = getEncryptedNote(noteData.content, key);
  try {
    await updateDoc(noteRef, { ...noteData, content: encryptedContent });
  } catch (error) {
    console.error("Error updating note: ", error);
  }
};

// Function to delete a note
export const deleteNote = async (userId, noteId) => {
  const db = getFirestore();
  const noteRef = doc(db, "users", userId, "notes", noteId);
  try {
    await deleteDoc(noteRef);
  } catch (error) {
    console.error("Error deleting note: ", error);
  }
};
