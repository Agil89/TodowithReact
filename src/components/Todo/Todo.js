import React from "react";
import { Link } from "react-router-dom";
import './Todo.css'

const Todo = ({ task, isAuthenticated }) => {
  return (
    <div className={`todo-item ${task.status ? 'completed' : ''}`}>
      <h3>{task.text}</h3>
      <p><strong>Email:</strong> {task.email}</p>
      <p><strong>Username:</strong> {task.username}</p>
      <p><strong>Status:</strong> {task.status ? 'Completed' : 'Incomplete'}</p>
      {isAuthenticated && (
        <Link to={`/update/${task.id}`} className="update-button">
          Update
        </Link>
      )}
    </div>
  );
};

export default Todo;


