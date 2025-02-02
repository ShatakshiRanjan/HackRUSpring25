import React, { useState, useEffect } from "react";

const Streak = () => {
  // Initializing state to store task completion dates
  const [completedTasks, setCompletedTasks] = useState([]);

  // Function to add a completed task date
  const addCompletedTask = (date) => {
    setCompletedTasks((prevTasks) => [...prevTasks, date]);
  };

  // Use useEffect to calculate the total number of unique days
  const uniqueDays = [...new Set(completedTasks.map(task => task))];

  return (
    <div>
      <h1>Total Days Tasks Were Completed: {uniqueDays.length}</h1>

      <button onClick={() => addCompletedTask(new Date().toLocaleDateString())}>
        Complete Task Today
      </button>

      <h2>Task Completion Dates:</h2>
      <ul>
        {uniqueDays.map((day, index) => (
          <li key={index}>{day}</li>
        ))}
      </ul>
    </div>
  );
};

export default Streak;
