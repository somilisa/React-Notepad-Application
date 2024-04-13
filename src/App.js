import { create } from "zustand";
import Notes from "./Components/Notes.jsx";
import { data } from "./data.js";
import { useForm, useWatch } from "react-hook-form";
import "./App.css";

export const useNoteStore = create((set) => ({
  notes: data,
  selectedNote: null,
  addNote: (newNote) => {
    set((state) => ({ notes: [...state.notes, newNote] }));
  },
  noteClick: (note) => {
    set((state) => ({ selectedNote: note }));
  },
}));

function App() {
  const { register, reset, setValue, handleSubmit } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const notes = useNoteStore((state) => state.notes);
  const addNote = useNoteStore((state) => state.addNote);

  const handleAddNote = handleSubmit(async (data) => {
    console.log("title: ", data.title);
    console.log("content: ", data.content);
    let newNote = {
      id: notes.length + 1,
      title: data.title,
      content: data.content,
    };
    addNote(newNote);
    console.log(notes);
    reset();
  });

  const noteClick = useNoteStore((state) => state.noteClick);

  const handleNoteClick = (note) => {
    noteClick(note);
    setValue("title", note.title);
    setValue("content", note.content);
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={handleAddNote}>
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          required
        />
        <textarea
          {...register("content")}
          placeholder="Note"
          rows={10}
          required
        />
        <button type="submit">Add Note </button>
      </form>
      <Notes handleNoteClick={handleNoteClick} />
    </div>
  );
}

export default App;
