import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeleteUser from "../Components/DeleteUser";
import "../Pages/UserStyle.css";

const UserList = ({ searchQuery }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");

  useEffect(() => {
    axios
      .get("http://localhost:9090/getAllUsers")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  useEffect(() => {
    handleSearch(localSearchQuery);
  }, [localSearchQuery, users]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredUsers(users);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredUsers(filtered);
  };

  const confirmDelete = (userId) => {
    setShowDeleteModal(true);
    setSelectedUserId(userId);
  };

  const handleConfirmDelete = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId));
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };

  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const handleView = (userId) => {
    navigate(`/view/${userId}`);
  };

  return (
    <div className="container mt-4">
      <div className="white-box">
        <h2 className="text-center mb-4">Chat App Users Information</h2>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Users"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
        </div>
        <h3 className="user-data">User Data</h3>
        <ul className="list-group mb-4">
          {filteredUsers.map((user) => (
            <li
              key={user.userId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {user.username}
              <div>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleView(user.userId)}
                >
                  View
                </button>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => handleEdit(user.userId)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => confirmDelete(user.userId)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showDeleteModal && (
        <DeleteUser
          userId={selectedUserId}
          onConfirmDelete={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserList;
