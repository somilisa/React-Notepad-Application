import { persist } from "zustand/middleware";
import Notes from "./Components/Notes.jsx";
import { data } from "./data.js";
import { useForm } from "react-hook-form";
import "./App.css";
import { create } from "zustand";

let store = (set) => ({
  notes: data,
  selectedNote: null,

  setNotes: (newNotes) => set({ notes: newNotes }),
  addNote: (newNote) => {
    set((state) => ({ notes: [...state.notes, newNote] }));
  },
  noteClick: (note) => {
    set((state) => ({ selectedNote: note }));
  },
});
store = persist(store, { name: "note-store" });
export const useNoteStore = create(store);

function App() {
  const { register, reset, setValue, getValues, handleSubmit } = useForm({
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

  let selectedNote = useNoteStore((state) => state.selectedNote);
  const setNotes = useNoteStore((state) => state.setNotes);

  const handleUpdateNote = (e) => {
    e.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      title: getValues("title"),
      content: getValues("content"),
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    console.log(notes);
    reset();
    selectedNote = null;
  };

  const handleCancel = () => {
    reset();
    selectedNote = null;
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={selectedNote ? handleUpdateNote : handleAddNote}
      >
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
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="reset" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <Notes handleNoteClick={handleNoteClick} />
    </div>
  );
}

export default App;
