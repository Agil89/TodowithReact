import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import UpdateTodo from "./components/UpdateToDo/UpdateToDo";
import { getTasks } from "./actions/taskActions";
import { Provider } from "react-redux";
import store from "./store/store";
import './App.css'

function App({ isAuthenticated, fetchTasks }) {
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li className="navbar-list">
                  <Link to="/">Home</Link>
                </li>
                {isAuthenticated ? (
                  <li className="navbar-list">
                    <Link to="/logout">Logout</Link>
                  </li>
                ) : (
                  <li className="navbar-list">
                    <Link to="/login">Login</Link>
                  </li>
                )}
              </ul>
            </nav>
          </header>
          <Routes>
            <Route exact path="/" element={<TodoForm />} />
            <Route path="/todo" element={<TodoList />} />
            <Route path="/update/:id" element={<UpdateTodo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTasks: () => dispatch(getTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
