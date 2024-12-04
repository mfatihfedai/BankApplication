import axios from "axios";

const apiUrl = `http://localhost:8080/auth/logout`;

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
