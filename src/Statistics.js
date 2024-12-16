import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import './Statistics.css';

// Импортируем изображения эмоций из папки assets
import emotion1 from './assets/emotion1.png';
import emotion2 from './assets/emotion2.png';
import emotion3 from './assets/emotion3.png';
import emotion4 from './assets/emotion4.png';
import emotion5 from './assets/emotion5.png';

const emotionImages = {
    5: emotion5,
    4: emotion4,
    3: emotion3,
    2: emotion2,
    1: emotion1,
};

function Statistics({ notes }) {
    // Подсчет средней оценки по датам
    const notesDataByDate = {};

    notes.forEach(note => {
        const date = note.date; // Предполагается, что формат даты в заметках - "день-месяц-год"
        const emotion = note.emotion; // Оценка от 1 до 5

        if (!notesDataByDate[date]) {
            notesDataByDate[date] = { total: 0, count: 0 };
        }

        // Суммируем оценки и увеличиваем счетчик
        notesDataByDate[date].total += emotion;
        notesDataByDate[date].count++;
    });

    // Преобразование объекта в массив для графика
    const chartData = Object.entries(notesDataByDate).map(([date, { total, count }]) => ({
        date,
        average: (total / count).toFixed(2), // Средняя оценка с двумя знаками после запятой
    }));

    // Сортировка данных по дате
    chartData.sort((a, b) => new Date(a.date.split('-').reverse().join('-')) - new Date(b.date.split('-').reverse().join('-')));

    return (
        <div className="statistics">
            <h2>Статистика по датам</h2>
            <LineChart width={600} height={300} data={chartData}>
                <XAxis dataKey="date" />
                <YAxis domain={[1, 5]} hide={true} /> {/* Скрываем ось Y */}
                <Tooltip content={(props) => {
                    const { active, payload } = props;
                    if (active && payload && payload.length) {
                        const averageEmotion = Math.round(payload[0].value);
                        return (
                            <div className="tooltip">
                                <img
                                    src={emotionImages[averageEmotion]}
                                    alt={`Эмоция ${averageEmotion}`}
                                    className="emotion-image"
                                />
                            </div>
                        );
                    }
                    return null;
                }} />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="average" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default Statistics;