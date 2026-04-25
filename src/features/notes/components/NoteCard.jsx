
function NoteCard({

    note,
    editingId,
    editText,
    setEditText,
    startEdit,
    handleUpdate,
    handleDelete,
    setEditingId,
    deletingId

}) {

    const isEditing = editingId === note.id;

  return (
    <div className={`note-card
        ${note.reminder_at ? "reminder" : ""}
        ${deletingId === note.id ? "removing" : ""}
    `}
    >

        {isEditing ? (

            <>
            
            <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
            />

            <button onClick={handleUpdate}>💾</button>
            <button onClick={() => setEditingId(null)}>❌</button>

            </>
        ) : (

            <>
            
            <div className="note-content">
                
                <span>{note.content}</span>

                {note.reminder_at && (
                    <small>
                        ⏰ {new Date(note.reminder_at).toLocaleDateString()}
                    </small>
                )}

            </div>
                
                <div className="note-actions">
                    <button 
                    className="edit"
                    onClick={() => startEdit(note)}
                    >
                        ✏️
                    </button>
                    <button 
                    className="delete"
                    onClick={() => handleDelete(note.id)}
                    >
                        🗑️
                    </button>
                </div>

                </>
        )}
        
        </div>
  );
}

export default NoteCard;