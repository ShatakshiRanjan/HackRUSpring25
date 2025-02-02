import { useState } from "react";
import "./Checklist.css"; // Importing the CSS file

//need to add a date element
const Checklist = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Finish project report', completed: true, difficulty: 'easy'},
        { id: 2, text: 'Meeting with team', completed: true, difficulty: 'hard'},
        { id: 3, text: 'Submit assignment', completed: false, difficulty: 'easy'}
    ]);

    // Function to toggle task completion
    const toggleCheck = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <div className="checklist-container">
            <h2 className="checklist-title">To-Do List</h2>
            <ul className="checklist">
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCheck(task.id)}
                            className="checkbox"
                        />
                        <span>{task.text} <span className="difficulty">({task.difficulty})</span></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;
