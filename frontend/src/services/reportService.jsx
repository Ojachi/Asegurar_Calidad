import axios from 'axios';
import { getToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL + '/report';

// Función para obtener la lista de reportes generados
export const getReports = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener reportes:', error.response?.data || error.message);
        throw error;
    }
};

// Función para descargar un reporte en PDF
export const downloadReport = async (reportId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/download/${reportId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob', // Para manejar archivos binarios (PDF)
        });

        // Crear un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `reporte-${reportId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error al descargar el reporte:', error.response?.data || error.message);
        throw error;
    }
};
