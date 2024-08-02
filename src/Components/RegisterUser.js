import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Pages/RegisterUserStyle.css"; // Assume this CSS file exists and is similar to your login page's CSS

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9090/register", {
        username,
        email,
        password,
      });
      setSuccess("Registration successful!");
      setError("");
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="register-form-control"
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="register-form-control"
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <div className="register-password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="register-form-control"
              />
              <span
                className="register-eye-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>
          </div>
          <button type="submit" className="register-btn register-btn-primary">
            Register
          </button>
          {error && <p className="register-text-danger">{error}</p>}
          {success && <p className="register-text-success">{success}</p>}
        </form>
        <div className="register-mt-3">
          <p>Already have an account? Proceed to</p>
          <button
            className="register-btn register-btn-secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
