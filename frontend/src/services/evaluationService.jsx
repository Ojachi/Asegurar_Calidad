import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/evaluation';

// Función para obtener las preguntas de evaluación
export const getEvaluationQuestions = async (id_model) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/questions/${id_model}`, {
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
export const submitEvaluation = async ({ softwareId, results, modelResult, id_model }) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_URL}/evaluate`,
            {
                id_software: softwareId,
                results, // Aquí se incluyen los resultados con el requirement_id
                modelResult,
                id_model
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al enviar evaluación:", error.response?.data || error.message);
        throw error;
    }
};

// Obtener las evaluaciones realizadas por el usuario
export const getUserEvaluations = async (id_user) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/user-evaluations/${id_user}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener evaluaciones:', error.response?.data || error.message);
        throw error;
    }
};

export const getEvaluationDetails = async (evaluationId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/evaluation-details/${evaluationId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener detalles de evaluación:", error.response?.data || error.message);
        throw error;
    }
};


