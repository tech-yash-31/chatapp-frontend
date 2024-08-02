import React, { useEffect, useState } from "react";
import { getUserById } from "../Services/UserService";

const UserDetail = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    const result = await getUserById(userId);
    setUser(result.data[0]);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Detail</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetail;
