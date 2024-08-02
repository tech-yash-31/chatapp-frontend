import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

  return (
    <div className="container">
      <h2>Login</h2>
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
      </form>
    </div>
  );
};

export default Login;
