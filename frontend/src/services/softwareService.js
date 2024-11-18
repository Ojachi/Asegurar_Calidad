import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/user/software';

// Función para registrar un nuevo software
export const registerSoftware = async (softwareData) => {
    try {
        const token = getToken();
        const response = await axios.post(API_URL, softwareData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al registrar software:', error.response?.data || error.message);
        throw error;
    }
};

// Función para obtener la lista de software registrados
export const getSoftwareList = async () => {
    try {
        const token = getToken();
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener la lista de software:', error.response?.data || error.message);
        throw error;
    }
};
