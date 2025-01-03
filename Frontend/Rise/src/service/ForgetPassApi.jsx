import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${import.meta.env.VITE_VERSION}`;


export const forgetPass = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/user/forgetPass`, email, {
            headers: { "Content-Type": "text/plain" },
        });
        return response;
    } catch (error) {
        console.error("Could not send email ", error.message);
        throw error;
    }
}