import Notes from "./Components/Notes.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <form className="note-form">
        <input type="text" placeholder="Title" required />
        <textarea placeholder="Note" rows={10} required />
        <button type="submit">Add Note </button>
      </form>
      <Notes />
    </div>
  );
}

export default App;
