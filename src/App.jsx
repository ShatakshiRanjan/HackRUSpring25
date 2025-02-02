import { useState } from 'react'
import './App.css'
import Navbar from "./Navbar";
import About from "./About";
import GamePage from './GamePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EndOfDayCountdown from './EndOfDayCountdown';
import CalendarComponent from './CalendarComponent';
import Checklist from './Checklist';
//import { Checkbox } from "@/components/ui/checkbox";

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskDifficulty, setTaskDifficulty] = useState("");

  const addTask = async () => {
    if (!taskName.trim() || !taskDate.trim() || !taskDifficulty.trim()) return;

    try {
        const response = await fetch("http://127.0.0.1:5000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                task_name: taskName,
                task_date: taskDate,
                task_difficulty: taskDifficulty, 
                task_completed: false
            })
        });

        const data = await response.json();
        if (response.ok) {
            setTaskName(""); setTaskDate(""); setTaskDifficulty(""); // Clear input fields
        } else {
            console.error(data.error);
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
};


  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home 
          taskName={taskName} setTaskName={setTaskName}
          taskDate={taskDate} setTaskDate={setTaskDate}
          taskDifficulty={taskDifficulty} setTaskDifficulty={setTaskDifficulty}
          addTask={addTask}
          />} />
          <Route path="/game" element={<GamePage />} />
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
    </Router>
  );
}

function Home({ taskName, setTaskName, taskDate, setTaskDate, taskDifficulty, setTaskDifficulty, addTask }){
  return(
    <div className='main-container'>
    <div className='container1'>
      <img className = "pet" src={'../public/placeholder.avif'}></img>
      <div>
        <h2>Task Management Game</h2>
        <h3>Complete real-life tasks to keep your virtual pet alive</h3>
        <div>
        <input 
                type="text" 
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)} 
                placeholder="Task Name"
            />
          <input 
                type="date" 
                value={taskDate} 
                onChange={(e) => setTaskDate(e.target.value)}
            />
          <select value={taskDifficulty} onChange={(e) => setTaskDifficulty(e.target.value)}>
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
          </select>
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
    </div>

  <div className='container2'>
    <CalendarComponent></CalendarComponent>
    <EndOfDayCountdown></EndOfDayCountdown>
    <Checklist></Checklist>
    <button>Progress-Bar/Pie-Chart</button>
    <button>Streak</button>
  </div>
  </div>
  )
}

export default App
