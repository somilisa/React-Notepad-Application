import React from "react";
import { data } from "../data";
const Notes = () => {
  const [notes, setNotes] = React.useState(data);
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div class="notes-item" key={note.id}>
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
