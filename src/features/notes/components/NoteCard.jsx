
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

    const getReminderStatus = () => {
        if (!note.reminder_at) return null;

        const now = new Date();
        const reminderDate = new Date(note.reminder_at);

        const diff = reminderDate -now;
        const diffHours = Math.floor (diff /(1000 *60 * 60));
        const diffDays = Math.floor (diffHours / 24);

        const formatHour = reminderDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

       if (diff < 0) {
        const lateHours = Math.abs(diffHours);
        const lateDays = Math.floor(lateHours / 24);

        if (lateHours < 24) {
            return {
                label: `Hace ${lateHours}h`,
                className: "overdue"
            };
        }

        return {
            label: `Hace ${lateDays} día${lateDays >1 ? "s" : ""}`,
            className: "overdue"
        };
       }

       if (diffHours < 3) {
            return {
                label: `Hoy ${formatHour} • Soon`,
                className: "soon"
            };
       }

       if (diffHours < 24) {
        return {
            label: `Hoy ${formatHour}`,
            className: "soon"
        };
       }

       return {
        label: `En ${diffDays} días`,
        className: "upcoming"
       };
    };

    const reminderStatus = getReminderStatus();




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

                {note.reminder_at && reminderStatus && (
                    <small className={`reminder-status ${reminderStatus.className}`}>
                        ⏰ {reminderStatus.label}
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