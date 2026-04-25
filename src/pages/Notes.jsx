import { useEffect, useState } from "react";
import { useAuth } from "../store/useAuth";
import { getNotes, createNote, deleteNote, updateNote } from "../features/notes/notesService";
import NotesInput from "../features/notes/components/NotesInput";
import NoteCard from "../features/notes/components/NoteCard";

function Notes() {

    const { user } = useAuth();

    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");
    const [reminderAt, setReminderAt] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [deletingId, setDeletingId] = useState(null);
 

    const loadNotes = async () => {
        const { data } = await getNotes();
        setNotes( data || []);
    };



    useEffect(() => {
        loadNotes();
    }, []);

    const handleAdd = async () => {
        if (!text.trim()) return;

        setLoading(true);

        try {
            const { data, error } = await createNote( text, user.id, reminderAt || null);

            if (!error && data) {
                setNotes((prev) => [data[0], ...prev]);                
            }

            setText("");
            setReminderAt("");

        } finally {
            setLoading(false);
        }    

    };

    const handleDelete = async (id) => {
        
        setDeletingId(id);

        setTimeout(async () => {
            await deleteNote(id);
            setNotes((prev) => prev.filter((n) => n.id !== id ));
            setDeletingId(null);
        }, 300);
        
    };


    const startEdit = (note) => {
        setEditingId(note.id);
        setEditText(note.content);
    };

    const handleUpdate = async () => {
        if (!editText.trim()) return;

        const { data, error } = await updateNote(editingId, editText);

        if (!error && data) {
            setNotes((prev) =>
            prev.map((n) =>
            n.id === editingId ? data[0] : n
                )
            );
        }

        setEditingId(null);
        setEditText("");
    }

  return (
    <div className="notes-container">

        <h2>Notas</h2>

        <NotesInput
            text={text}
            setText={setText}
            reminderAt={reminderAt}
            setReminderAt={setReminderAt}
            handleAdd={handleAdd}
            loading={loading}
        />

        <div className="notes-list">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    editingId={editingId}
                    editText={editText}
                    setEditText={setEditText}
                    startEdit={startEdit}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    setEditingId={setEditingId}
                    deletingId={deletingId}
                />
            ))}
        </div>       


    </div>
  );
};

export default Notes;