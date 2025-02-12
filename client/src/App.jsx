import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => setNotes(res.data));
  }, []);

  const addNote = async () => {
    if (!text) return;
    const res = await axios.post("http://localhost:3000/api/notes", { text });
    setNotes([res.data, ...notes]);
    setText("");
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div>
      <h1>QuickNotes</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text} <button onClick={() => deleteNote(note.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
