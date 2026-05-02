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
    const [notifiedIds, setNotifiedIds] = useState([]);
 

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


    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    },[]);

    const showNotification = (note) => {
        if (Notification.permission === "granted") {
            new Notification("⏰ Recordatorio", {
                body: note.content,
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            notes.forEach((note) => {
                if (note.reminder_at) {
                    const reminderTime = new Date(note.reminder_at);

                    const diff = reminderTime - now;

                    if (
                        diff <= 0 &&
                        !notifiedIds.includes(note.id)
                        ) {
                        showNotification(note);
                        setNotifiedIds((prev) => {
                            if (prev.includes(note.id)) return prev;
                            return [...prev, note.id];
                        });
                    }
                }
            });
        }, 1000);

        return() => clearInterval(interval);
    }, [notes, notifiedIds]);


  return (
    <div className="notes-container">

    <div className="top-bar">

        <h2>Notas</h2>

        <div className="top-actions">

        </div>

    </div>


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