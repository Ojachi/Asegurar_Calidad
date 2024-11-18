import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getUserRole } from '../services/authService';
import Navbar from '../components/Navbar';

const UserHome = () => {
    const navigate = useNavigate();

    // Verificar si el usuario tiene el rol de usuario normal
    const role = getUserRole();
    if (role !== 'user') {
        navigate('/login');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="user-container">
            <Navbar />
            <h2>Dashboard del Usuario</h2>
            <div className="user-actions">
                <button onClick={() => navigate('/user/register-software')}>Registrar Software</button>
                <button onClick={() => navigate('/user/evaluate-software')}>Evaluar Software</button>
                <button onClick={() => navigate('/user/view-reports')}>Ver Reportes</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default UserHome;
    