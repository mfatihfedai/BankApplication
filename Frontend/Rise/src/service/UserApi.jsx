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
}

export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `${apiUrl}/${id}`
    );
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
