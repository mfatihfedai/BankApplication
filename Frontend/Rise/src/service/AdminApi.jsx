import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${import.meta.env.VITE_VERSION}`;

const apiUrl = `${API_URL}/admin`;

export const getUsersLogs = async(keyword, page) => {
    try {
        const response = await axios.get(`${apiUrl}/logChartResponse`, {
            params: {
                keyword: keyword,
                page: page,
                pageSize: 10,
            }
        });
        return response.data;
    } catch(error) {
        console.error(error);
        throw error;
    }
}