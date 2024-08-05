import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Pages/RegisterUserStyle.css";

const RegisterUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:9090/register", {
        username,
        email,
        password,
      });
      setSuccess("Registration successful!");
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
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
            {usernameError && (
              <p className="register-text-danger">{usernameError}</p>
            )}
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
            {emailError && <p className="register-text-danger">{emailError}</p>}
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
            {passwordError && (
              <p className="register-text-danger">{passwordError}</p>
            )}
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
