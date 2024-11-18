import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const ProtectedRoute = ({ children }) => {
    const token = getToken();

    // Si no hay un token en localStorage, redirige al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si el token existe, permite el acceso a la ruta
    return children;
};

export default ProtectedRoute;
