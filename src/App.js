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
import { routes } from "./Util/Constants";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("jwtToken")
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    localStorage.setItem("username", user.username);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername("");
    window.location.href = "/login";
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("jwtToken"));
    setUsername(localStorage.getItem("username") || "");
  }, []);

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        username={username}
      />
      <Routes>
        <Route
          path={routes.HOME_ROUTE_EX}
          element={<Home searchQuery={searchQuery} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path={routes.HOME_ROUTE_IN}
          element={<Home searchQuery={searchQuery} isLoggedIn={isLoggedIn} />}
        />
        <Route path={routes.ABOUT} element={<About />} />
        <Route path={routes.LOGIN} element={<Login onLogin={handleLogin} />} />
        <Route path={routes.REGISTER} element={<RegisterUser />} />
        {/* Protected routes */}
        <Route
          path={routes.GROUP_CHAT}
          element={<PrivateRoute element={GroupChat} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path={routes.USERS}
          element={
            <PrivateRoute
              element={UserList}
              isLoggedIn={isLoggedIn}
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path={routes.EDIT_USER}
          element={<PrivateRoute element={EditUser} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path={routes.VIEW_USER}
          element={<PrivateRoute element={ViewUser} isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
