import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `http://localhost:8080/dev/v1/user`;

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
