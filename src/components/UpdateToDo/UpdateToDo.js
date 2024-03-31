import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTask } from "../../actions/taskActions";
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTodo = ({ tasks, updateTask, match }) => {
 
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));
  
  const [text, setText] = useState(task ? task.text : "");
  const [email, setEmail] = useState(task ? task.email : "");
  const [username, setUsername] = useState(task ? task.username : "");
  const [status, setStatus] = useState(task ? task.status : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...task, text, email, username, status });
    navigate('/');
  };

  return (
    <div>
      {task ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <label>
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            Completed
          </label>
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
});

export default connect(mapStateToProps, { updateTask })(UpdateTodo);
