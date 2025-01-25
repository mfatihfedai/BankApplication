import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${
  import.meta.env.VITE_VERSION
}`;

export const getBanks = async () => {
  try {
    const response = await axios.get(`${API_URL}/banks`);
    return response.data.items;
  } catch (error) {
    console.error("No banks found ", error.message);
    throw error;
  }
};
