import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${import.meta.env.VITE_VERSION}`;

const apiUrl = `${API_URL}/user`;

export const createUser = async (user) => {
  try {
    const response = await axios.post(apiUrl, user);
    return response;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, data);
    return response;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export const getTransactionsByDate = async (userId, date) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/${userId}`, {
      params: { date: date }
    });
    return response;
  } catch (error) {
    console.error("Error fetching transactions by date:", error);
    throw error;
  }
