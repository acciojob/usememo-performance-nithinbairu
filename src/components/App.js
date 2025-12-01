import React, { useState, useMemo } from "react";
import "./../styles/App.css";

// Utility: Generate 50 tasks
const generateTasks = () => {
  return new Array(50).fill(0).map((_, index) => ({
    id: index + 1,
    text: `Todo ${index + 1}`,
    completed: (index +1)% 2 ? true : false, // First 25 completed, next 25 active
  }));
};

// Artificial slow function to simulate heavy rendering
function slowDownRendering(milliseconds = 5) {
  const start = Date.now();
  while (Date.now() - start < milliseconds) {}
}

const App = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const tasks = useMemo(() => generateTasks(), []);

  // ❗ useMemo to prevent expensive recalculations
  const filteredTasks = useMemo(() => {
    console.log("Filtering tasks...");

    if (activeFilter === "active") {
      return tasks.filter((t) => !t.completed);
    }
    if (activeFilter === "completed") {
      return tasks.filter((t) => t.completed);
    }
    return tasks;
  }, [activeFilter, tasks]);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <h2>Todo App – useMemo Performance Demo</h2>

      {/* Filter Buttons */}
      <div className="buttons">
        <button onClick={() => setActiveFilter("all")}>All</button>
        <button onClick={() => setActiveFilter("active")}>Active</button>
        <button onClick={() => setActiveFilter("completed")}>Completed</button>

        {/* Dark Mode */}
        <button onClick={() => setDarkMode((prev) => !prev)}>
          Toggle Dark Mode
        </button>
      </div>

      <b>Note: List rendering is artificially slowed down!</b>

      <ul>
        {filteredTasks.map((task) => {
          slowDownRendering(); // ⚠️ Artificial slow rendering

          return (
            <li
              key={task.id}
              className={task.completed ? "completed" : "active"}
            >
              {task.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
