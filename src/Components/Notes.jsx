import React from "react";
import { useNoteStore } from "../App";

const Notes = ({ handleNoteClick }) => {
  const notes = useNoteStore((state) => state.notes);

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div
          className="notes-item"
          key={note.id}
          onClick={() => handleNoteClick(note)}
        >
          <header>
            <button>x</button>
          </header>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Notes;
