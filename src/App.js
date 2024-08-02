import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "../src/Components/UserList";
import EditUser from "../src/Components/EditUser";
import RegisterUser from "./Components/RegisterUser";
import Login from "./Components/Login";
import Home from "./Components/Home";
import ViewUser from "./Components/ViewUser";
import Navbar from "./Components/Navbar";
import GroupChat from "./Components/GroupChat";
import About from "./Components/About";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("jwtToken")
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwtToken"));
  }, []);

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route
          path="/"
          element={<Home searchQuery={searchQuery} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/home"
          element={<Home searchQuery={searchQuery} isLoggedIn={isLoggedIn} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterUser />} />
        {/* Protected routes */}
        <Route
          path="/group/:groupName"
          element={<PrivateRoute element={GroupChat} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/users"
          element={
            <PrivateRoute
              element={UserList}
              isLoggedIn={isLoggedIn}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/edit/:userId"
          element={<PrivateRoute element={EditUser} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/view/:userId"
          element={<PrivateRoute element={ViewUser} isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
