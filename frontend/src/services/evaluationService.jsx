import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/evaluation';

// Función para obtener las preguntas de evaluación
export const getEvaluationQuestions = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/questions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener preguntas de evaluación:', error.response?.data || error.message);
        throw error;
    }
};

// Función para enviar las respuestas de la evaluación
export const submitEvaluation = async (softwareId, responses) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/evaluate`, { softwareId, responses }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al enviar evaluación:', error.response?.data || error.message);
        throw error;
    }
};

// Obtener las evaluaciones realizadas por el usuario
export const getUserEvaluations = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/user-evaluations`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener evaluaciones:', error.response?.data || error.message);
        throw error;
    }
};
