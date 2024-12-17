import React, { useState, useEffect } from 'react';
import './Tasks.css';
import emotion1 from './assets/emotion1.png';
import emotion2 from './assets/emotion2.png';
import emotion3 from './assets/emotion3.png';
import emotion4 from './assets/emotion4.png';
import emotion5 from './assets/emotion5.png';

function Tasks({ currentYear, currentMonth, currentDay, setNotes, notes, saveNoteToServer }) {
    const [currentNote, setCurrentNote] = useState("");
    const [currentEmotion, setCurrentEmotion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const generateNoteId = (day, month, year) => `${day}-${month}-${year}`;

    const handleNoteChange = (event) => {
        setCurrentNote(event.target.value);
    };

   const handleSaveNote = () => {
        if (currentNote.trim() !== "") {
            const noteId = generateNoteId(currentDay, currentMonth, currentYear);
            const newNote = {
                id: noteId,
                date: `${currentDay}-${currentMonth}-${currentYear}`,
                note: currentNote,
                emotion: currentEmotion
            };

            const existingNoteIndex = notes.findIndex(note => note.id === noteId);

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...notes];
                updatedNotes[existingNoteIndex] = newNote;
                setNotes(updatedNotes);
            } else {
                setNotes([...notes, newNote]);
            }

            // Save the note to the server
            saveNoteToServer(newNote);

            // Reset fields after saving
            setCurrentNote("");
            setCurrentEmotion(null);
            setIsEditing(false);
        }
    };

    const filteredNotes = notes.filter(note => note.id === generateNoteId(currentDay, currentMonth, currentYear));

    useEffect(() => {
        const noteId = generateNoteId(currentDay, currentMonth, currentYear);
        const existingNote = notes.find(note => note.id === noteId);
        if (existingNote) {
            setCurrentNote(existingNote.note);
            setCurrentEmotion(existingNote.emotion);
        } else {
            setCurrentNote("");
            setCurrentEmotion(null);
        }
    }, [currentMonth, currentYear, currentDay, notes]);

    // Array of emotions with image paths
    const emotions = [
        { id: 1, src: emotion1 },
        { id: 2, src: emotion2 },
        { id: 3, src: emotion3 },
        { id: 4, src: emotion4 },
        { id: 5, src: emotion5 },
    ];

    // New order for emotions during editing
    const editingEmotionsOrder = [
        { id: 5, src: emotion5 },
        { id: 4, src: emotion4 },
        { id: 3, src: emotion3 },
        { id: 2, src: emotion2 },
        { id: 1, src: emotion1 },
    ];

    return (
        <div className="tasks-container">
            <h2>Заметка на {currentDay}.{currentMonth}.{currentYear}</h2>

            {/* Display the selected emotion as an image */}
            <div className="emotion-display">
                {currentEmotion !== null ? (
                    <img
                        src={emotions[currentEmotion - 1].src}
                        alt={`Эмоция ${currentEmotion}`}
                        className="emotion-image-display"
                    />
                ) : null}
            </div>

            <div className="notes-list">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map(note => (
                        <div key={note.id} className="note-item">
                            {note.note}
                        </div>
                    ))
                ) : (
                    <p>Нет заметки на этот день.</p>
                )}
            </div>

            <div className="button">
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Отменить редактирование" : "Редактировать день"}
                </button>
            </div>

            {isEditing && (
                <div className="editing">
                    <p>Как прошёл этот день?</p>

                    {/* Render images for selecting emotions in a different order */}
                    <div className="emotion-selection">
                        {(editingEmotionsOrder).map(emotion => (
                            <img
                                key={emotion.id}
                                src={emotion.src}
                                alt={`Эмоция ${emotion.id}`}
                                onClick={() => setCurrentEmotion(emotion.id)}
                                className={`emotion-image ${currentEmotion === emotion.id ? 'selected' : ''}`}
                            />
                        ))}
                    </div>

                    <textarea
                        value={currentNote}
                        onChange={handleNoteChange}
                        placeholder="Напишите вашу заметку здесь..."
                        className="note-input"
                    />

                    <p></p>
                    <button onClick={handleSaveNote} className="save-button">Сохранить заметку</button>
                </div>
            )}
        </div>
    );
}

export default Tasks;