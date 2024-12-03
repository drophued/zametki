import React, { useState, useEffect } from 'react';
import './Tasks.css';

function Tasks({ currentMonthTasks, currentYear, currentMonth, currentDay }) {
    const [currentNote, setCurrentNote] = useState("");
    const [notesList, setNotesList] = useState([]);

    // Generate a unique ID for the note based on day, month, and year
    const generateNoteId = (day, month, year) => `${day}-${month}-${year}`;

    // Handle changes in the note input
    const handleNoteChange = (event) => {
        setCurrentNote(event.target.value);
    };

    // Save the note
    const handleSaveNote = () => {
        if (currentNote.trim() !== "") {
            const noteId = generateNoteId(currentDay, currentMonth, currentYear);
            const existingNoteIndex = notesList.findIndex(note => note.id === noteId);

            if (existingNoteIndex !== -1) {
                // Update existing note
                const updatedNotes = [...notesList];
                updatedNotes[existingNoteIndex].note = currentNote;
                setNotesList(updatedNotes);
            } else {
                // Add new note
                setNotesList([
                    ...notesList,
                    {
                        id: noteId,
                        date: `${currentDay}-${currentMonth}-${currentYear}`,
                        note: currentNote
                    }
                ]);
            }

            setCurrentNote(""); // Clear the input field
        }
    };

    // Filter notes for the current day, month, and year
    const filteredNotes = notesList.filter(note => note.id === generateNoteId(currentDay, currentMonth, currentYear));

    // Effect to load the existing note when the month or year changes
    useEffect(() => {
        const noteId = generateNoteId(currentDay, currentMonth, currentYear);
        const existingNote = notesList.find(note => note.id === noteId);
        if (existingNote) {
            setCurrentNote(existingNote.note); // Load existing note if it exists
        } else {
            setCurrentNote(""); // Clear input if no note exists
        }
    }, [currentMonth, currentYear, currentDay, notesList]);

    return (
        <div className="tasks-container">
            <h2>Заметка на {currentDay}</h2>
            <textarea
                value={currentNote}
                onChange={handleNoteChange}
                placeholder="Напишите вашу заметку здесь..."
                className="note-input"
            />
            <button onClick={handleSaveNote} className="save-button">Сохранить заметку</button>
            <div className="notes-list">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map(note => (
                        <div key={note.id} className="note-item">
                            <strong>{note.date}:</strong> {note.note}
                        </div>
                    ))
                ) : (
                    <p>Нет сохраненных заметок.</p>
                )}
            </div>
            <div className="tasks-list">
                {currentMonthTasks && currentMonthTasks.length > 0 ? (
                    currentMonthTasks.map((task, index) => (
                        <div key={index} className="task-item">{task}</div>
                    ))
                ) : (
                    <p>Нет задач на этот месяц.</p>
                )}
            </div>
        </div>
    );
}

export default Tasks;