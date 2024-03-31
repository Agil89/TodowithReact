import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTask, getTasksPerPage } from "../../actions/taskActions";
import TodoList from "../TodoList/TodoList";
import { useSelector } from 'react-redux';
import './TodoForm.css';

const TodoForm = ({ addTask, getTasksPerPage }) => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(false);
  const pageNumber = useSelector(state => state.tasks.pageNumber);
  const sortingBy = useSelector(state => state.tasks.sortBy);

  useEffect(() => {
    const savedSortingBy = localStorage.getItem('sortingBy');
    if (savedSortingBy) {
      getTasksPerPage(pageNumber, savedSortingBy);
    }
  }, [pageNumber]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !email.trim() || !username.trim()) return;
    addTask({ text, email, username, status });
    setText("");
    setEmail("");
    setUsername("");
  };

  const handleSortChange = (e) => {
    const sortByValue = e.target.value;
    getTasksPerPage(pageNumber, sortByValue);
    localStorage.setItem('sortingBy', sortByValue);
  };

  return (
    <div className="Parent">
      <form className="Form-part" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
        <button type="submit">Add Task</button>
      </form>
      <div className="d-flex justify-content-end mb-3 sort-by">
        <label className="label-sort-by" htmlFor="sort">Sort by:</label>
        <select id="sort" className="form-control ml-2" onChange={handleSortChange} value={sortingBy}>
          <option value="default">Default</option>
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="status">Status</option>
        </select>
      </div>
      <TodoList />
    </div>
  );
};

export default connect(null, { addTask, getTasksPerPage })(TodoForm);
