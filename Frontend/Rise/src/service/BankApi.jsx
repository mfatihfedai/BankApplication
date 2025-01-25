import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${
  import.meta.env.VITE_VERSION
}`;

const apiUrl = `${API_URL}/banks`;

export const getBanks = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        pageSize: 100,
      }
    }
    );
    return response.data.items;
  } catch (error) {
    console.error("No banks found ", error.message);
    throw error;
  }
};

export const createBank = async (data) => {
  try {
    const response = await axios.post(apiUrl, data);
    return response.data;
  } catch (error) {
    console.error("Do not create the bank: ", error.message);
    throw error;
  }
};

export const updateBank = async (id, data) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Do not update the bank: ", error.message);
    throw error;
  }
};

export const deleteBank = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    console.error("Do not delete the bank: ", error.message);
    throw error;
  }
};
