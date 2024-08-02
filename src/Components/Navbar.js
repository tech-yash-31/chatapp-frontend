import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../Pages/Navbar.css";

const Navbar = ({ isLoggedIn, onLogout, searchQuery, setSearchQuery }) => {
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
      <nav className="navbar navbar-expand-lg navbar-dark gradient-navbar">
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

            {location.pathname === "/users" && (
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            )}

            {isLoggedIn ? (
              <button className="btn btn-outline-light" onClick={onLogout}>
                Logout
              </button>
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
