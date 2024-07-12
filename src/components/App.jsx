import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  // Load notes from local storage when the component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to local storage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function editNote(id) {
    const noteToEdit = notes.find((noteItem, index) => index === id);
    setEditingNote({ id, ...noteToEdit });
  }

  function updateNote(updatedNote) {
    setNotes(prevNotes => {
      return prevNotes.map((noteItem, index) => {
        if (index === updatedNote.id) {
          return updatedNote;
        }
        return noteItem;
      });
    });
    setEditingNote(null);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} onUpdate={updateNote} editingNote={editingNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
