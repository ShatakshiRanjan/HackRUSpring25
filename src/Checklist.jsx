import axios from "axios";
import { useState, useEffect } from "react";
import {io} from "socket.io-client";
import "./Checklist.css"; // Importing the CSS file

//need to add a date element
const Checklist = () => {
    const [tasks, setTasks] = useState([]);
    /*{ id: 1, task_name: 'Finish project report', task_completed: true, task_difficulty: 'easy', task_date: "2025-02-02"},
        { id: 2, task_name: 'Meeting with team', task_completed: true, task_difficulty: 'hard', task_date: "2025-02-02"},
        { id: 3, task_name: 'Submit assignment', task_completed: false, task_difficulty: 'easy', task_date: "2025-02-02"}*/

    const fetchTasks = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/tasks/today");
                setTasks(response.data);  // Update state with today's tasks
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
     };
    
    // Function to toggle task completion
    const toggleCheck = async (taskId, isCompleted) => {
        try {
            // Optimistically update UI
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, task_completed: isCompleted } : task
                )
            );
            await axios.post("http://127.0.0.1:5000/tasks/complete", {
                task_id: taskId,
                completed: isCompleted  // Send true (complete) or false (incomplete)
            });

            //fetchTasks(); // Refresh tasks after update
        } catch (error) {
            console.error("Error updating task:", error);
            fetchTasks();
        }
    };

    useEffect(() => {
        fetchTasks();
        // Connect to the Flask-SocketIO WebSocket server
        const socket = io("http://127.0.0.1:5000");

        // ✅ Listen for a new task being added
        socket.on("task_added", (newTask) => {
            setTasks(prevTasks => [...prevTasks, newTask]); // Append new task to the list
        });

        // ✅ Listen for task completion updates
        socket.on("task_updated", (updatedTask) => {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === updatedTask.id ? { ...task, task_completed: updatedTask.task_completed } : task
                )
            );
        });

        // ✅ Listen for task deletions
        socket.on("task_deleted", (deletedTask) => {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTask.id));
        });

        return () => socket.disconnect(); // Cleanup WebSocket on component unmount

    }, []);

    return (
        <div className="checklist-container">
            <h2 className="checklist-title">To-Do List</h2>
            <ul className="checklist">
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.task_completed ? "completed" : ""}`}>
                        <input
                            type="checkbox"
                            checked={task.task_completed}
                            onChange={(e) => toggleCheck(task.id, e.target.checked)}
                            className="checkbox"
                        />
                        <span>{task.task_name} <span className="difficulty">({task.task_difficulty})</span></span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;
