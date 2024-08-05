import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Pages/Navbar.css";

const Navbar = ({
  isLoggedIn,
  onLogout,
  searchQuery,
  setSearchQuery,
  username,
}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (event) => {
    const value = event.target.value;
    console.log("Search Query:", value);
    setSearchQuery(value);
  };

  const handleRegisterLoginClick = () => {
    if (isRegistered) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark transparent-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            A ChatApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/users">
                  Users
                </Link>
              </li>
            </ul>

            {isLoggedIn ? (
              <div className="d-flex align-items-center user-info">
                <span className="avatar">
                  {username.charAt(0).toUpperCase()}
                </span>
                <span className="username">{username}</span>
                <button className="btn btn-outline-light" onClick={onLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-light"
                onClick={handleRegisterLoginClick}
              >
                {isRegistered ? "Login" : "Register"}
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
