import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiUrl = `${BASE_URL}/auth/logout`;

export const logoutUser = async ({user}) => {
  
  try {
    const response = await axios.post(
      apiUrl,
      {},
      {
        params: { user },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    
    return response;
  } catch (error) {
    console.error("Logout failed:", error.message);
    throw error;
  }
};
