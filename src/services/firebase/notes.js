import { collection, getDoc, setDoc, addDoc, getDocs, getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_ENCRYPTION_KEY;


// Клас для управління кешем
class CacheManager {
  constructor() {
    this.cache = new Map();
  }
  encrypt(value) {
    // Перетворення об'єкта або масиву в JSON рядок перед шифруванням
    const stringValue = JSON.stringify(value);
    return getEncryptedNote(stringValue, key);
  }

  decrypt(encryptedValue) {
    // Дешифрування та перетворення JSON рядка назад в об'єкт
    const decryptedString = getDecryptedNote(encryptedValue, key);
    try {
    return JSON.parse(decryptedString);
    } catch (e) {
    console.error("Error parsing JSON during decryption:", e);
    return null;
    }
    }
  set(key, value) {
    // Шифруємо значення перед зберіганням
    const encryptedValue = this.encrypt(value);
    this.cache.set(key, encryptedValue);
  }

  get(key) {
    // Отримуємо зашифроване значення за ключем
    const encryptedValue = this.cache.get(key);
    // Дешифруємо значення перед поверненням
    return this.decrypt(encryptedValue);
  }

  has(key) {
    return this.cache.has(key);
  }
}


const cacheManager = new CacheManager();



// Function to encrypt the note content
const getEncryptedNote = (noteContent, key) => {
  if (!key) {
    console.error("Encryption key is undefined.");
    return '';
  }
  const cipherParams = CryptoJS.TripleDES.encrypt(noteContent, key);
  return cipherParams.toString();
};

// Function to decrypt the note content
const getDecryptedNote = (cipherText, key) => {
  if (!cipherText || typeof cipherText !== 'string') {
    console.error("Invalid cipher text for decryption.");
    return '';
  }
  try {
    const bytes = CryptoJS.TripleDES.decrypt(cipherText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error during decryption: ", error);
    return '';
  }
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
    const cacheKey = `notes-${userId}`;
    cacheManager.set(cacheKey, encryptedContent)
    return { id: docRef.id, ...note, userId, createdAt }; 
  } catch (error) {
    console.error("Error saving note: ", error);
  }
};

// Function to fetch all notes of the current user
export const fetchNotes = async (userId) => {
  const cacheKey = `notes-${userId}`;
  if (cacheManager.has(cacheKey)) {
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) {
      const notes = JSON.parse(cachedData).map(note => ({
        ...note,
        createdAt: new Date(note.createdAt)
      }));
      return notes;
    }
  }

  const db = getFirestore();
  const notesCollection = collection(db, "users", userId, "notes");
  try {
    const snapshot = await getDocs(notesCollection);
    const notes = [];
    snapshot.forEach((doc) => {
      const noteData = doc.data();
      const decryptedContent = getDecryptedNote(noteData.content, key);
      const createdAt = noteData.createdAt ? noteData.createdAt.toDate() : new Date();
      notes.push({ id: doc.id, ...noteData, content: decryptedContent, createdAt });
    });
    cacheManager.set(cacheKey, JSON.stringify(notes));
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
    const updatedNotes = await fetchNotes(userId);
    cacheManager.set(`notes-${userId}`, JSON.stringify(updatedNotes));
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

//сохранение цвета для даты
export const setColorForDate = async (userId, date, colors) => {
  const db = getFirestore();
  const dateColorRef = doc(db, "users", userId, "calendarColors", date); // используем дату как ID документа
  try {
    await updateDoc(dateColorRef, { colors });
  } catch (error) {
    if (error.code === "not-found") {
      // Если документ не найден, создаем его
      await setDoc(dateColorRef, { colors });
    } else {
      console.error("Error saving color for date: ", error);
    }
  }
};



//получение цвета для даты
export const getColorForDate = async (userId, date) => {
  const db = getFirestore();
  const dateColorRef = doc(db, "users", userId, "calendarColors", date);
  try {
    const docData = await getDocs(dateColorRef);
    if (docData.exists()) {
      return docData.data().colors;
    }
  } catch (error) {
    console.error("Error fetching color for date: ", error);
  }
  return null; // Возвращаем null, если документ не существует или произошла ошибка
};



//получение цветов для всех дат
export const getAllColors = async (userId) => {
  const cacheKey = `all-colors-${userId}`;

  if (cacheManager.has(cacheKey)) {
    return cacheManager.get(cacheKey);
  }

  const db = getFirestore();
  const colorsCollection = collection(db, "users", userId, "calendarColors");
  const colors = {};
  try {
    const snapshot = await getDocs(colorsCollection);
    snapshot.forEach((doc) => {
      colors[doc.id] = doc.data().colors;
    });
    cacheManager.set(cacheKey, colors);
    return colors;
  } catch (error) {
    console.error("Error fetching colors: ", error);
  }
  cacheManager.set(cacheKey, {});
  return {};
};


export const saveQuickNoteForDate = async (userId, date, quickNote) => {
  if (!quickNote.trim()) {
    // Якщо нотатка порожня, повертаємося, щоб уникнути зайвого запиту
    return;
  }

  const db = getFirestore();
  const formattedDate = date.toString().substring(0, 15);
  const dateNoteRef = doc(db, "users", userId, "dateNotes", formattedDate);
  const encryptedNote = getEncryptedNote(quickNote, key);
  try {
    await setDoc(dateNoteRef, { note: encryptedNote }, { merge: true });
    const cacheKey = `quick-note-${userId}-${formattedDate}`;
    cacheManager.set(cacheKey, quickNote)
  } catch (error) {
    console.error("Error saving quick note for date: ", error);
  }
};



export const getQuickNoteForDate = async (userId, date) => {
  const formattedDate = date.toString().substring(0, 15);
  const cacheKey = `quick-note-${userId}-${formattedDate}`;
  if (cacheManager.has(cacheKey)) {
    return cacheManager.get(cacheKey);
  }

  const db = getFirestore();
  const dateNoteRef = doc(db, "users", userId, "dateNotes", formattedDate);

  try {
    const docSnap = await getDoc(dateNoteRef);
    if (docSnap.exists()) {
      const decryptedNote = getDecryptedNote(docSnap.data().note, key);
      if (decryptedNote) {
        cacheManager.set(cacheKey, decryptedNote);
        return decryptedNote;
      }
      
    }
  } catch (error) {
    console.error("Error fetching quick note for date: ", error);
  }

  cacheManager.set(cacheKey, "");
  return "";
};


export const saveNotesForMonth = async (userId, year, month, notes) => {
  const db = getFirestore();
  const monthRef = doc(db, "users", userId, "notesByMonth", `${year}-${month}`);
  
  try {
    // Шифруем заметки и создаем объект для сохранения в Firestore
    const encryptedNotes = {};
    for (const [date, note] of Object.entries(notes)) {
      const encryptedNote = getEncryptedNote(note, key);
      encryptedNotes[date] = encryptedNote;
    }
    
    // Сохраняем зашифрованные заметки для месяца
    await setDoc(monthRef, encryptedNotes, { merge: true });
  } catch (error) {
    console.error("Error saving notes for month: ", error);
  }
};

export const getNotesForMonth = async (userId, year, month) => {
  const cacheKey = `month-notes-${userId}-${year}-${month}`;
  
  if (cacheManager.has(cacheKey)) {
    return cacheManager.get(cacheKey);
  }

  const db = getFirestore();
  const monthRef = doc(db, "users", userId, "notesByMonth", `${year}-${month}`);

  try {
    const docSnap = await getDoc(monthRef);
    if (docSnap.exists()) {
      const monthNotes = docSnap.data();
      const decryptedNotes = {};
      for (const [date, note] of Object.entries(monthNotes)) {
        decryptedNotes[date] = getDecryptedNote(note);
      }
      cacheManager.set(cacheKey, decryptedNotes);
      return decryptedNotes;
    }
  } catch (error) {
    console.error("Error fetching notes for month: ", error);
  }

  cacheManager.set(cacheKey, {});
  return {};
};

const printCacheContents = () => {
  for (const [key, value] of cacheManager.cache.entries()) {
    console.log(`Key: ${key}, Value : ${value}`);
    
  }
};

