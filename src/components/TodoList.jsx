import React, { useState } from "react";
import "./TodoList.css";

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setIsEditing(index);
    setCurrentTask(tasks[index]);
  };

  const saveTask = (index) => {
    const newTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? currentTask : task
    );
    setTasks(newTasks);
    setIsEditing(null);
    setCurrentTask("");
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
      <button onClick={addTask}>Add Task</button>
      <p>Total Tasks: {tasks.length}</p>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <input type="checkbox" className="task-checkbox" />
            {isEditing === index ? (
              <input
                type="text"
                value={currentTask}
                onChange={(e) => setCurrentTask(e.target.value)}
              />
            ) : (
              task
            )}
            {isEditing === index ? (
              <button onClick={() => saveTask(index)}>Save</button>
            ) : (
              <button onClick={() => editTask(index)}>Edit</button>
            )}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todolist;
