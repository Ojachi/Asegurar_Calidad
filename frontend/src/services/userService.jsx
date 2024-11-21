import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL;

export const registerSoftware = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/user/software`, data, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data;
    } catch (error) {
        console.error("Error al registrar software:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserSoftware = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/software/${userId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener software:", error.response?.data || error.message);
        throw error;
    }
};
