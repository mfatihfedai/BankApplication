import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${import.meta.env.VITE_VERSION}`;



export const createInvoice = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/invoices/create`,
            data,
            {
            headers: { "Content-Type": 'application/json' },
            });
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}