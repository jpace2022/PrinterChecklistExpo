import axios from 'axios';

const API_URL = 'http://your-api-url.com/printers'; // Replace with your actual API URL

export const fetchPrinters = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching printers:', error);
        throw error;
    }
};

export const addPrinter = async (printerData) => {
    try {
        const response = await axios.post(API_URL, printerData);
        return response.data;
    } catch (error) {
        console.error('Error adding printer:', error);
        throw error;
    }
};

export const updatePrinter = async (printerId, printerData) => {
    try {
        const response = await axios.put(`${API_URL}/${printerId}`, printerData);
        return response.data;
    } catch (error) {
        console.error('Error updating printer:', error);
        throw error;
    }
};