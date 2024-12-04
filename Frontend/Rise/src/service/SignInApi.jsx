import axios from "axios";

// const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `http://localhost:8080/auth/login`;

export const signInUser = async (identityNo, password) => {
  // const {setUserId, userId} = useContext(UserContext);
  try {
    const response = await axios.post(
      apiUrl,
      {},
      {
        params: { identityNo, password },
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    const token = response.data.token;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    localStorage.setItem("token", token); // Token localStorage'a kaydoluyor.
    return response;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};
