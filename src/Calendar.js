import React, { useState, useEffect } from 'react';
import Tasks from './Tasks';
import './Calendar.css';

function Calendar({ setNotes, notes, saveNoteToServer }) {

    function getDaysInMonth(year, month) {
        const daysInMonths = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };

        const isLeapYear = (year) => {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        };

        if (isLeapYear(year)) {
            daysInMonths[2] = 29;
        }

        return daysInMonths[month];
    }

    const [currentMonth, setMonth] = useState(new Date().getMonth() + 1); // Current month
    const [currentYear, setYear] = useState(new Date().getFullYear()); // Current year
    const [currentDay, setCurrentDay] = useState(new Date().getDate()); // Current day

    const initMonth = [
        { id: 1, month: "Январь" },
        { id: 2, month: "Февраль" },
        { id: 3, month: "Март" },
        { id: 4, month: "Апрель" },
        { id: 5, month: "Май" },
        { id: 6, month: "Июнь" },
        { id: 7, month: "Июль" },
        { id: 8, month: "Август" },
        { id: 9, month: "Сентябрь" },
        { id: 10, month: "Октябрь" },
        { id: 11, month: "Ноябрь" },
        { id: 12, month: "Декабрь" }
    ];

    const handleChangeMonth = (event) => {
        setMonth(Number(event.target.value)); // Ensure month is a number
    };

    const handleChangeYear = (event) => {
        setYear(Number(event.target.value)); // Ensure year is a number
    };

    const daysCount = getDaysInMonth(currentYear, currentMonth);

    // Function to create an array of day buttons
    const renderDayButtons = () => {
        return Array.from({ length: daysCount }, (_, i) => {
            const day = i + 1;
            const isSelected = day === currentDay; // Check if this day is selected
            return (
                <button
                    key={day}
                    className={`day-button ${isSelected ? 'selected' : ''}`} // Apply 'selected' class if it's the current day
                    onClick={() => handleDayClick(day)} // Set current day on button click
                >
                    {day}
                </button>
            );
        });
    };

    // Function to handle day button click
    const handleDayClick = (day) => {
        setCurrentDay(day); // Update current day state
    };

 return (
        <div>
            <div className="calendar">
                <h2>Текущий месяц:
                    <select value={currentMonth} onChange={handleChangeMonth}>
                        {initMonth.map((month) => (
                            <option key={month.id} value={month.id}>
                                {month.month}
                            </option>
                        ))}
                    </select>
                </h2>

                <h2>Текущий год:
                    <input
                        type="number"
                        value={currentYear}
                        onChange={handleChangeYear}
                        min="1900"
                        max="2100"
                    />
                </h2>
            </div>

            <div className="day-buttons-container">
                {renderDayButtons()}
            </div>

            <div>
                <Tasks
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    currentDay={currentDay}
                    setNotes={setNotes}
                    notes={notes}
                    saveNoteToServer={saveNoteToServer} // Pass save function to Tasks
                />
            </div>
        </div>
    );
}

export default Calendar;