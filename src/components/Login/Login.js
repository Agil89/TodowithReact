import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser, clearError } from "../../actions/authActions";
import { Navigate } from "react-router-dom";
import './Login.css'

const Login = ({ loginUser, isAuthenticated, error, clearError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setRedirect(true);
    }
    return () => {
      clearError();
    };
  }, [isAuthenticated, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser({ username, password });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red", display:"flex",alignItems:"center",justifyContent:"center" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
});

export default connect(mapStateToProps, { loginUser, clearError })(Login);
