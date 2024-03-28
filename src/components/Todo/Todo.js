import React from "react";
import { Link } from "react-router-dom";
import './Todo.css'

const Todo = ({ task, isAuthenticated }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">

      <div className="parent-part">
      <div className="todo-part">
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none", flex: 1 }}
      >
        {task.text}
      </span>
      {task.status ? (
        <span className="text-success">(Completed)</span>
      ) : (
        <span className="text-warning">(Pending)</span>
      )}
      </div>
      
      <div className="user-part">
      {task.user ? (
        <span className="text-success">({task.user})</span>
      ) : (
        <span className="text-warning">(Anonymous user)</span>
      )}
      </div>
      </div>
      
        <div className="update-button">
        {isAuthenticated && (
        <Link to={`/update/${task.id}`}>
          <button className="btn btn-sm btn-primary ml-2">Update</button>
        </Link>
      )}
        </div>
      
    </li>
  );
};

export default Todo;
