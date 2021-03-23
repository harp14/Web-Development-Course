import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    const [notes, setNotes] = useState([]);
    
    // Add new note to notes array
    function addNote(newNote) {
        setNotes(prevNotes => {
            return [...prevNotes, newNote];
        });
    }

    // Delete note by id
    function deleteNote(noteId) {
        setNotes((prevNotes) => {
            return prevNotes.filter(
                (item, index) => {
                    return index !== noteId;
                }
            );
        });
    }

    return (
    <div>
      <Header />
      <CreateArea onAdd = {addNote} />
      {notes.map((item, index) => (
        <Note
            key={index}
            id={index}
            title={item.title}
            content={item.content}
            onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
