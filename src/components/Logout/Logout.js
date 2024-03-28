import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import './Logout.css'

const Logout = ({ logoutUser }) => {

  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem('token');
    navigate("/")
  };

  return (
    <div>
      <h2>Logout</h2>
      <div className="logout-button">
       <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default connect(null, { logoutUser })(Logout);
