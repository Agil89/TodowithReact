import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../../actions/taskActions";
import TodoList from "../TodoList/TodoList";
import './TodoForm.css';

const TodoForm = ({ addTask }) => {
  const [text, setText] = useState("");
  const [status,setStatus] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask({ text, status });
    setText("");
  };

  return (
    <div className="Parent">
       <form className="Form-part" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
        />

      <button type="submit">Add Task</button>
    </form>
    <TodoList />
    </div>
   
  );
};

export default connect(null, { addTask })(TodoForm);
