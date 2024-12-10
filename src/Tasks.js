import React, { useState, useEffect } from 'react';
import './Tasks.css';

function Tasks({ currentMonthTasks, currentYear, currentMonth, currentDay }) {
    const [currentNote, setCurrentNote] = useState("");
    const [notesList, setNotesList] = useState([]);
    const [currentEmotion, setCurrentEmotion] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Состояние для отслеживания режима редактирования

    // Генерация уникального ID для заметки на основе дня, месяца и года
    const generateNoteId = (day, month, year) => `${day}-${month}-${year}`;

    // Обработка изменений в поле заметки
    const handleNoteChange = (event) => {
        setCurrentNote(event.target.value);
    };

    // Сохранение заметки
    const handleSaveNote = () => {
        if (currentNote.trim() !== "") {
            const noteId = generateNoteId(currentDay, currentMonth, currentYear);
            const existingNoteIndex = notesList.findIndex(note => note.id === noteId);

            if (existingNoteIndex !== -1) {
                // Обновление существующей заметки
                const updatedNotes = [...notesList];
                updatedNotes[existingNoteIndex] = {
                    ...updatedNotes[existingNoteIndex],
                    note: currentNote,
                    emotion: currentEmotion // Сохранение выбранной эмоции
                };
                setNotesList(updatedNotes);
            } else {
                // Добавление новой заметки
                setNotesList([
                    ...notesList,
                    {
                        id: noteId,
                        date: `${currentDay}-${currentMonth}-${currentYear}`,
                        note: currentNote,
                        emotion: currentEmotion // Сохранение выбранной эмоции
                    }
                ]);
            }

            // Очистка полей после сохранения
            setCurrentNote("");
            setCurrentEmotion(null);
            setIsEditing(false); // Закрытие режима редактирования
        }
    };

    // Фильтрация заметок для текущего дня, месяца и года
    const filteredNotes = notesList.filter(note => note.id === generateNoteId(currentDay, currentMonth, currentYear));

    // Эффект для загрузки существующей заметки при изменении месяца или года
    useEffect(() => {
        const noteId = generateNoteId(currentDay, currentMonth, currentYear);
        const existingNote = notesList.find(note => note.id === noteId);
        if (existingNote) {
            setCurrentNote(existingNote.note); // Загрузка существующей заметки
            setCurrentEmotion(existingNote.emotion); // Загрузка существующей эмоции
        } else {
            setCurrentNote("");
            setCurrentEmotion(null);
        }
    }, [currentMonth, currentYear, currentDay, notesList]);

    const emotions = [1, 2, 3, 4, 5]; // Определение возможных эмоций

    return (
        <div className="tasks-container">
            <h2>Заметка на {currentDay}</h2>

            {/* Кнопка для редактирования дня */}
            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Закрыть редактирование" : "Редактировать день"}
            </button>

            {/* Поля для ввода заметки и оценки отображаются только в режиме редактирования */}
            {isEditing && (
                <>
                    <textarea
                        value={currentNote}
                        onChange={handleNoteChange}
                        placeholder="Напишите вашу заметку здесь..."
                        className="note-input"
                    />
                    <p>Как прошёл этот день?</p>
                    {emotions.map(emotion => (
                        <button key={emotion} onClick={() => setCurrentEmotion(emotion)}>{emotion}</button>
                    ))}

                    <button onClick={handleSaveNote} className="save-button">Сохранить заметку</button>
                </>
            )}

            <div className="notes-list">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map(note => (
                        <div key={note.id} className="note-item">
                            <strong>{note.date}:</strong> {note.note} (Оценка: {note.emotion})
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