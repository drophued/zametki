import React, {useState} from 'react';
import Calendar from './Calendar';
import './App.css';

function App() {

    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isTasksPageOpen, setIsTasksPageOpen] = useState(false);

    function openTasksPage() {
        setIsTasksPageOpen(true);
        setIsMainOpen(false);
    }

    function openMainPage() {
        setIsTasksPageOpen(false);
        setIsMainOpen(true);
    }

    function result() {
        if (isMainOpen) {
            return <div>
                <div className="maindiv">
                    <ul className="mainul">
                        <li><h1>Сегодняшний день</h1></li>
                        <li>
                            <button onClick={openTasksPage}>Перейти к календарю</button>
                        </li>
                        <li>
                            <button>Статистика</button>
                        </li>
                    </ul>
                </div>
                <div className="today">
                    <h1>Как прошёл ваш день?</h1>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                    <textarea placeholder={"Добавьте заметку..."}
                              rows={10}
                              cols={60}></textarea>
            </div>
                <div className="saveButton">
                    <button>Сохранить</button>
                </div>
            </div>

        } else if (isTasksPageOpen) {
            return <div>
                <div>
                    <div className="maindiv">
                        <ul className="mainul">
                            <li><button onClick={openMainPage}>Сегодняшний день</button></li>
                            <li>
                                <h1>Перейти к календарю</h1>
                            </li>
                            <li>
                                <button>Статистика</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <Calendar/>
            </div>
        }
    }

    return (
        <body>
        <div className="App">
            {result()}
        </div>
        </body>
    );
}

export default App;

