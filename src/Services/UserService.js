import axios from "axios";

const API_BASE_URL = "http://localhost:9090";

export const getAllUsers = async () => {
  return await axios.get(`${API_BASE_URL}/getAllUsers`);
};

export const getUserById = async (userId) => {
  return await axios.get(`${API_BASE_URL}/userinfo/${userId}`);
};

export const registerUser = async (user) => {
  return await axios.post(`${API_BASE_URL}/register`, user);
};

export const updateUser = async (userId, user) => {
  return await axios.put(`${API_BASE_URL}/user/${userId}`, user);
};

export const deleteUser = async (userId) => {
  return await axios.delete(`${API_BASE_URL}/user/${userId}`);
};
