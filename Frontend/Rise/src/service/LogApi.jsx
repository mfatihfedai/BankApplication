import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${
  import.meta.env.VITE_VERSION
}`;


export const getLogs = async (currentPage) => {
    try {
        const response = await axios.get(`${API_URL}/logs?page=${currentPage}&pageSize=10`);
        return response;
    } catch(error){
        console.error("No logs found ", error.message);
        throw error;
    }
}