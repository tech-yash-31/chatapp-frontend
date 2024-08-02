import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Pages/HomeStyle.css";

const Home = ({ searchQuery, isLoggedIn }) => {
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      const fetchGroups = async () => {
        try {
          const response = await axios.get("http://localhost:9090/home", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          });
          setGroups(response.data);
          setFilteredGroups(response.data);
        } catch (err) {
          console.error("Error fetching groups", err);
          setError("Error fetching groups");
        }
      };
      fetchGroups();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (groups.length > 0) {
      handleSearch(searchQuery);
    }
    console.log("Search Query in Home:", searchQuery);
  }, [searchQuery, groups]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredGroups(groups);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = groups.filter((group) =>
      Object.values(group).some((value) =>
        value.toString().toLowerCase().includes(lowercasedQuery)
      )
    );
    console.log("Filtered Groups:", filtered);
    setFilteredGroups(filtered);
  };

  return (
    <div className="container mt-5">
      {!isLoggedIn ? (
        <div className="text-center">
          <h1>Welcome to ChatApp</h1>
          <p className="lead">
            A chat app to connect and communicate with people.
          </p>
          <div>
            <Link to="/login" className="btn btn-primary me-3">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-4">Groups</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="list-group">
            {filteredGroups.map((group) => (
              <div
                key={group.groupId}
                className="list-group-item list-group-item-action"
              >
                {group.groupName}
                <Link
                  to={`/group/${group.groupName}`}
                  className="btn btn-primary ml-2"
                >
                  Join
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
