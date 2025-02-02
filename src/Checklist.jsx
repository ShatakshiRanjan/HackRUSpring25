import { useState } from "react";
const Checklist = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Finish project report', completed: true, difficulty: 'easy'},
        { id: 2, text: 'Meeting with team', completed: true, difficulty: 'hard'},
        { id: 3, text: 'Submit assignment', completed: false, difficulty: 'easy'}
    ]);
    const toggleCheck = (id) => {
    }
}