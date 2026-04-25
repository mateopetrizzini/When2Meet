function NotesInput({

    text,
    setText,
    reminderAt,
    setReminderAt,
    handleAdd,
    loading
}) {

    return (

        <div className="notes-input">

        <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribí algo..."
        />

        <input
            type="datetime-local"
            value={reminderAt}
            onChange={(e) => setReminderAt(e.target.value)}
        />

        <button
            onClick={handleAdd}
            disabled={!text.trim() || loading}
        >
            {loading ? "Agregando..." : "Agregar"}
        </button>

        </div>
    );

}

export default NotesInput;