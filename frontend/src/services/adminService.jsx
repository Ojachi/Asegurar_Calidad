import axios from 'axios';
import { getToken } from "./authService";

const API_URL = process.env.REACT_APP_API_URL + "/admin";

// Obtener la lista de preguntas
export const getQuestions = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/questions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener preguntas:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Agregar una nueva pregunta
export const addQuestion = async (description) => {
  try {
    const token = getToken();
    await axios.post(
      `${API_URL}/questions`,
      { description },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error(
      "Error al agregar pregunta:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar una pregunta
export const deleteQuestion = async (questionId) => {
  try {
    const token = getToken();
    await axios.delete(`${API_URL}/questions/${questionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(
      "Error al eliminar pregunta:",
      error.response?.data || error.message
    );
    throw error;
  }
};
// Obtener todas las evaluaciones realizadas por los usuarios
export const getAllEvaluations = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/evaluations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error al obtener evaluaciones:",
      error.response?.data || error.message
    );
    throw error;
  }
};
