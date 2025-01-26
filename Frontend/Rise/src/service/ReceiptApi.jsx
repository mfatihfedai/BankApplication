import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${
  import.meta.env.VITE_VERSION
}`;


export const getReceipts = async () => {
    try {
        const response = await axios.get(`${API_URL}/receipt/get`);
        return response;
    } catch(error){
        console.error("No receipt found ", error.message);
        throw error;
    }
}

export const getAllReceipts = async () => {
    try {
        const response = await axios.get(`${API_URL}/receipt/getAll`);
        return response;
    } catch(error){
        console.error("No receipt found ", error.message);
        throw error;
    }
}