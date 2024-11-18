import axios from 'axios';

// Obtener la URL base del backend desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL + '/auth';

// Función para registrar un nuevo usuario
export const register = async (cedula, username, email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {cedula, username, email, password });
        return response.data;
    } catch (error) {
        console.error('Error al registrar:', error.response?.data || error.message);
        throw error;
    }
};

// Función para iniciar sesión y obtener el token
export const login = async (cedula, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { cedula, password });
        if (response.data.data.token) {
            // Guardar el token y el rol en localStorage
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('role', response.data.data.role);
        }
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data || error.message);
        throw error;
    }
};

// Función para cerrar sesión
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

// Función para obtener el token desde localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Función para obtener el rol del usuario desde localStorage
export const getUserRole = () => {
    return localStorage.getItem('role');
};
