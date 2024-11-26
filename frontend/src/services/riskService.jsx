import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/risk';

// Función para enviar la matriz de riesgos
export const submitRiskMatrix = async (softwareId, riskItems) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/risks`, { softwareId, riskItems }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar matriz de riesgos:', error.response?.data || error.message);
        throw error;
    }
};

export const getUserRiskMatrices = async (userId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/user-risks/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener matrices de riesgos:", error.response?.data || error.message);
        throw error;
    }
};

export const getRiskMatrixDetails = async (riskId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/risk-details/${riskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener detalles de la matriz de riesgos:", error.response?.data || error.message);
        throw error;
    }
};



