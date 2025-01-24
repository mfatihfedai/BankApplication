import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${import.meta.env.VITE_VERSION}`;

const apiUrl = `${API_URL}/invoices`;
export const createInvoice = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/create`,
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

export const getAllAutobill = async () => {
    try {
        const response = await axios.get(`${apiUrl}/autobill`,
            {
            headers: { "Content-Type": 'application/json' },
            });
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const updateInvoice = async (id, data) => {
    try {
        const response = await axios.put(`${apiUrl}/${id}`, data,
            {
            headers: { "Content-Type": 'application/json' },
            });
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const getLastFourInvoice = async (invoiceNo) => {
    try {
        const response = await axios.get(`${apiUrl}/lastFourInvoiceAmount`,
        {
            params: { invoiceNumber: invoiceNo},
            headers: { "Content-Type": 'application/json' },
        });
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const updateAutobill = async (id, autobill) => {
    try {
        const response = await axios.put(`${apiUrl}/autobill/${id}?autobill=${autobill}`,
        {
            headers: { "Content-Type": 'application/json' },
        }  
        );
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}