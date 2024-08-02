import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Pages/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/authenticate", {
        username,
        password,
      });

      const token = response.data;
      localStorage.setItem("jwtToken", token);
      console.log("user token: " + JSON.stringify(token));

      setSuccess("Login successful!");
      setError("");
      onLogin();
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please try again.");
      setSuccess("");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="h2 login">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control password-input"
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-login-primary">
            Login
          </button>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
