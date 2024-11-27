import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/user';

export const registerSoftware = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/software`, data, {
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
        const response = await axios.get(`${API_URL}/software/${userId}`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener software:", error.response?.data || error.message);
        throw error;
    }
};

export const updateSoftware = async (softwareId, softwareData) => {
    try {
      const response = await axios.put(`${API_URL}/software/${softwareId}`, softwareData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el software:", error.response?.data || error.message);
      throw error;
    }
  };

  export const deleteSoftware = async (softwareId) => {
    try {
      const response = await axios.delete(`${API_URL}/software/${softwareId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el software:", error.response?.data || error.message);
      throw error;
    }
  };

export const getModels = async () => {
    try {
        const response = await axios.get(`${API_URL}/software/models`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener modelos:", error.response?.data || error.message);
        throw error;
    }
};
