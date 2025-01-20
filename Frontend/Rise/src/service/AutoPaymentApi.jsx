import axios from "axios";
const API_URL = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_DEV}${import.meta.env.VITE_VERSION}`;



export const getAllAutobill = async () => {
    try {
        const response = await axios.get(`${API_URL}/invoices/autobill`,
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
        const response = await axios.put(`${API_URL}/invoices/${id}`, data,
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
        const response = await axios.get(`${API_URL}/invoices/lastFourInvoiceAmount`,
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