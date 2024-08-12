import React, { useState } from "react";
import { registerUser, updateUser } from "../Services/UserService";

const UserForm = ({ userId, userToEdit, onSave }) => {
  const [user, setUser] = useState(userToEdit || { name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userId) {
      await updateUser(userId, user);
    } else {
      await registerUser(user);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
