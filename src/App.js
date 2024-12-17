import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import Statistics from './Statistics';
import './App.css';

function App() {
    const [showStatistics, setShowStatistics] = useState(false);
    const [notes, setNotes] = useState([]); // State to hold notes

    // Fetch notes from the server on component mount
    useEffect(() => {
        fetch('http://127.0.0.1:5000/notes')
            .then(response => response.json())
            .then(data => setNotes(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, []);

    // Function to save notes to the server
    const saveNoteToServer = (note) => {
        fetch('http://127.0.0.1:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data.message))
            .catch(error => console.error('Error saving note:', error));
    };

    const handleShowStatistics = () => {
        setShowStatistics(true);
    };

    const handleBackToCalendar = () => {
        setShowStatistics(false);
    };

    return (
        <div className="App">
            {showStatistics ? (
                <div>
                    <div className="maindiv">
                        <ul className="mainul">
                            <li>
                                <button className="backToCalendar" onClick={handleBackToCalendar}>
                                    Календарь
                                </button>
                            </li>
                            <li>
                                <h1>Статистика</h1>
                            </li>
                        </ul>
                    </div>
                    <Statistics notes={notes} /> {/* Pass notes data to Statistics */}
                </div>
            ) : (
                <div>
                    <div className="maindiv">
                        <ul className="mainul">
                            <li>
                                <h1>Календарь</h1>
                            </li>
                            <li>
                                <button onClick={handleShowStatistics}>Статистика</button>
                                {/* Show statistics */}
                            </li>
                        </ul>
                    </div>
                    <Calendar setNotes={setNotes} notes={notes} saveNoteToServer={saveNoteToServer} /> {/* Pass notes state and save function */}
                </div>
            )}
        </div>
    );
}

export default App;