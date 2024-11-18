import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, getUserRole } from '../services/authService';
import Navbar from '../components/Navbar';

const AdminHome = () => {
    const navigate = useNavigate();

    // Verificar si el usuario tiene el rol de administrador
    const role = getUserRole();
    if (role !== 'admin') {
        navigate('/login');
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-container">
            <Navbar />
            <h2>Dashboard del Administrador</h2>
            <div className="admin-actions">
                <button onClick={() => navigate('/admin/manage-questions')}>Gestionar Preguntas</button>
                <button onClick={() => navigate('/admin/view-results')}>Ver Resultados</button>
                <button onClick={() => navigate('/admin/manage-users')}>Gestionar Usuarios</button>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default AdminHome;
