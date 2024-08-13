import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../Pages/EditUserStyle.css";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:9090/getUser/${userId}`)
      .then((response) => {
        const userData = response.data[0];
        setUser(userData);
        setNewEmail(userData.email);
        setNewUsername(userData.username);
      })
      .catch((error) => {
        console.error("There was an error fetching the user!", error);
      });
  }, [userId]);

  const handleUpdate = () => {
    if (!user) return;

    const updatedUser = { ...user, email: newEmail, username: newUsername };
    axios
      .put(`http://localhost:9090/user/${user.userId}`, updatedUser)
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        console.error("There was an error updating the user!", error);
      });
  };

  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      {user && (
        <div className="edit-user-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="button-group">
            <button className="btn btn-success" onClick={handleUpdate}>
              Update
            </button>
            <Link className="btn btn-primary" to="/users">
              Back to User List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
