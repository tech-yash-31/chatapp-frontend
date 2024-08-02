import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/getUser/${userId}`)
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error fetching the user!", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">View User</h2>
      <div className="card">
        <div className="card-header">
          <h3>User Details</h3>
        </div>
        <div className="card-body">
          <p>
            <strong>User ID:</strong> {user.userId}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
        </div>
      </div>
      <Link className="btn btn-primary mt-4" to="/users">
        Back to User List
      </Link>
    </div>
  );
};

export default ViewUser;
