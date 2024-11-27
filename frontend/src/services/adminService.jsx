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

export const getModels = async () => {
  try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/models`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error al obtener modelos:', error.response?.data || error.message);
      throw error;
  }
};

export const getRequirements = async (modelId) => {
  try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/requirements/${modelId}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error al obtener requerimientos:', error.response?.data || error.message);
      throw error;
  }
};

export const addQuestion = async (description, requirementId) => {
  try {
      const token = getToken();
      await axios.post(
          `${API_URL}/questions`,
          { description, requirement: requirementId },
          {
              headers: { Authorization: `Bearer ${token}` },
          }
      );
  } catch (error) {
      console.error(
          'Error al agregar pregunta:',
          error.response?.data || error.message
      );
      throw error;
  }
};