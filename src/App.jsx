import { useState } from 'react';
import './App.css';
import Navbar from "./Navbar";
import About from "./About";
import GamePage from './GamePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EndOfDayCountdown from './EndOfDayCountdown';
import CalendarComponent from './CalendarComponent';
import Checklist from './Checklist';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="main-container">
      <div className="container1">
        {/* Replace placeholder image with iframe */}
        <iframe 
          className="game-iframe" 
          src="http://localhost:5173/game" 
          title="Game Screen"
          frameBorder="0">
        </iframe>

        <div>
          <h2>Task Management Game</h2>
          <h3>Complete real-life tasks to keep your virtual pet alive</h3>
          <div>
            <input type="text" placeholder="Add a task with difficulty" />
            <select name="difficulty" id="diff">
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
            </select>
            <input type="date" placeholder="Due Date" />
            <button>Go</button>
          </div>
        </div>
      </div>

      <div className="container2">
        <CalendarComponent />
        <EndOfDayCountdown />
        <Checklist />
        <button>Progress-Bar/Pie-Chart</button>
        <button>Streak</button>
      </div>
    </div>
  );
}

export default App;
