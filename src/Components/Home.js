import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/HomeStyle.css";
import {
  setGroups,
  joinGroup,
  setJoinedGroups,
  setFilteredGroups,
} from "../store/actions/groupActions";

const Home = ({ searchQuery, isLoggedIn }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  const joinedGroups = useSelector((state) => state.groups.joinedGroups);
  const filteredGroups = useSelector((state) => state.groups.filteredGroups); // Access filtered groups
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchGroups = async () => {
        try {
          const response = await axios.get("http://localhost:9090/home", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          });
          dispatch(setGroups(response.data));

          // Load user's joined groups from local storage
          const joinedGroupsFromStorage =
            JSON.parse(localStorage.getItem(`joinedGroups-${username}`)) || [];
          dispatch(setJoinedGroups(joinedGroupsFromStorage));
        } catch (err) {
          console.error("Error fetching groups", err);
          setError("Error fetching groups");
        }
      };
      fetchGroups();
    }
  }, [isLoggedIn, username, dispatch]);

  useEffect(() => {
    if (groups.length > 0) {
      handleSearch(searchQuery);
    }
  }, [searchQuery, groups]);

  const handleSearch = (query) => {
    if (!query) {
      // If there's no query, just show all groups
      dispatch(setFilteredGroups(groups));
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = groups.filter((group) =>
      Object.values(group).some((value) =>
        value.toString().toLowerCase().includes(lowercasedQuery)
      )
    );

    // Update the filtered groups in the Redux state
    dispatch(setFilteredGroups(filtered));
  };

  const handleJoin = async (groupName) => {
    if (!joinedGroups.includes(groupName)) {
      dispatch(joinGroup(groupName));

      // Update local storage to add the group to the joined groups
      const updatedJoinedGroups = [...joinedGroups, groupName];
      localStorage.setItem(
        `joinedGroups-${username}`,
        JSON.stringify(updatedJoinedGroups)
      );

      // Navigate to the group page after joining
      navigate(`/group/${groupName}`);
    }
  };

  // Determine which groups to display (filtered or all)
  const displayGroups = filteredGroups.length > 0 ? filteredGroups : groups;

  return (
    <div className="container-home mt-5">
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
          <input
            type="text"
            placeholder="Search Groups"
            className="form-control mb-3"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {error && <p className="text-danger">{error}</p>}
          <div className="list-group">
            {displayGroups.map((group) => (
              <div
                key={group.groupId}
                className="list-group-item list-group-item-action"
              >
                {group.groupName}
                {!joinedGroups.includes(group.groupName) ? (
                  <button
                    className="btn btn-primary ml-2"
                    onClick={() => handleJoin(group.groupName)}
                  >
                    Join
                  </button>
                ) : (
                  <>
                    <span className="badge bg-success ml-2">Joined</span>
                    <Link
                      to={`/group/${group.groupName}`}
                      className="btn btn-secondary ml-2"
                    >
                      View
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
