import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";

function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Book Locker</h1>
        {token && (
          <div className="nav-links">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/search" className="nav-link">
              Search
            </Link>
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
            <Link to="/location" className="nav-link">
              Locations
            </Link>
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
            <Link to="/login" className="nav-link" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
