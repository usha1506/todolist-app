import React, { useState } from "react";
import "./TodoList.css";

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("low");
  const [newDueDate, setNewDueDate] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState("");
  const [currentPriority, setCurrentPriority] = useState("low");
  const [currentDueDate, setCurrentDueDate] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        { text: newTask, priority: newPriority, dueDate: newDueDate },
      ]);
      setNewTask("");
      setNewPriority("low");
      setNewDueDate("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setIsEditing(index);
    setCurrentTask(tasks[index].text);
    setCurrentPriority(tasks[index].priority);
    setCurrentDueDate(tasks[index].dueDate);
  };

  const saveTask = (index) => {
    const newTasks = tasks.map((task, taskIndex) =>
      taskIndex === index
        ? {
            text: currentTask,
            priority: currentPriority,
            dueDate: currentDueDate,
          }
        : task
    );
    setTasks(newTasks);
    setIsEditing(null);
    setCurrentTask("");
    setCurrentPriority("low");
    setCurrentDueDate("");
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <select
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <button onClick={addTask}>Add Task</button>
      <p>Total Tasks: {tasks.length}</p>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.priority}`}>
            <input type="checkbox" className="task-checkbox" />
            {isEditing === index ? (
              <>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                />
                <select
                  value={currentPriority}
                  onChange={(e) => setCurrentPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="date"
                  value={currentDueDate}
                  onChange={(e) => setCurrentDueDate(e.target.value)}
                />
                <button onClick={() => saveTask(index)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <span className={`priority ${task.priority}`}>
                  {task.priority}
                </span>
                <span className="due-date">{task.dueDate}</span>
                <button onClick={() => editTask(index)}>Edit</button>
              </>
            )}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
