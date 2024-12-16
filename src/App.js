import React, { useState } from 'react';
import Calendar from './Calendar';
import Statistics from './Statistics';
import './App.css';

function App() {
    const [showStatistics, setShowStatistics] = useState(false);
    const [notes, setNotes] = useState([]); // State to hold notes

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
                    <Statistics notes={notes}/> {/* Pass notes data to Statistics */}
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
                    <Calendar setNotes={setNotes} notes={notes} /> {/* Pass notes state to Calendar */}
                </div>
            )}
        </div>
    );
}

export default App;