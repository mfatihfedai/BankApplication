import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `http://localhost:8080/login`;
export const signInUser = async (identityNo, password) => {
  try {
    const response = await axios.post(apiUrl, { identityNo, password });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    // throw error;
  }
};
