import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;

const apiUrl = `http://localhost:8080/dev/v1/user/1`;

export const getUserById = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const getBanks = async () => {
    try{
      const token = localStorage.getItem("authToken");
        const response = await axios.get(
            "http://localhost:8080/dev/v1/banks",
            {
              Authorization: `Bearer ${token}`,
            }
        )
        return response.data;
    }catch(err){
        console.log(err.message);
        throw error;
    }
}