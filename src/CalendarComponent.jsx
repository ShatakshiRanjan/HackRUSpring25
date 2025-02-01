import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalenderComponent.css';

const CalendarComponent = () => {
    const getRandomColor = () => {
        const colors = ['purple', 'pink','red', 'blue', 'green', 'orange', 'yellow', 'teal']
        return colors[Math.floor(Math.random()* colors.length)];
    }
    const [tasks, setTasks] = useState({
        '2025-02-01': [{ text: 'Finish project report', completed: true, color: getRandomColor()}],
        '2025-02-03': [{ text: 'Meeting with team', completed: true, color: getRandomColor() }],
        '2025-02-05': [{ text: 'Submit assignment', completed: false, color: getRandomColor() }],
    })
    //returns "completed" if all tasks are completed and "task" if there are pending tasks
    const getTileClass = (date) =>{
        const dateString = date.toISOString().split('T')[0];
        if (!tasks[dateString]) return '';
        return tasks[dateString].every(task =>task.completed) ? 'completed': 'task';
    };
    return (
        <div className="calendar-container">
            <Calendar
                tileClassName={({ date }) => getTileClass(date)}
                tileContent={({ date }) => {
                    const dateString = date.toISOString().split('T')[0];
                    return tasks[dateString] ? (
                        <ul className="task-list">
                            {tasks[dateString].map((task, index) => (
                                <li key={index} style={{ color: task.completed ? 'gray' : task.color }}>
                                    {task.text}
                                </li>
                            ))}
                        </ul>
                    ) : null;
                }}
            />
        </div>
    );
};
export default CalendarComponent;