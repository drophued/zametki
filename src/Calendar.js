import React, { useState } from 'react';
import Tasks from './Tasks';
import './Calendar.css';

function Calendar() {
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

    const [currentMonth, setMonth] = useState(11); // November
    const [currentYear, setYear] = useState(2024);
    const [currentDay, setCurrentDay] = useState(null); // State for the currently selected day

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
        return Array.from({ length: daysCount }, (_, i) => (
            <button
                key={i + 1}
                className="day-button"
                onClick={() => handleDayClick(i + 1)} // Set current day on button click
            >
                {i + 1}
            </button>
        ));
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
                    />
                </h2>
            </div>

            <div className="day-buttons-container">
                {renderDayButtons()} {/* Render day buttons */}
            </div>

            {/* Pass the current month, year, and selected day to Tasks */}
            <div>
                <Tasks
                    currentMonth={currentMonth} // Pass the current month as a number
                    currentYear={currentYear} // Pass the current year
                    currentDay={currentDay} // Pass the selected day to Tasks
                />
            </div>
        </div>
    );
}

export default Calendar;