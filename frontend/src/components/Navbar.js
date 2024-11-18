import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, logout } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const role = getUserRole();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2>Calidad de Software</h2>
            <div className="nav-links">
                {role === 'admin' && (
                    <>
                        <Link to="/admin">Dashboard Admin</Link>
                        <Link to="/admin/manage-questions">Gestionar Preguntas</Link>
                        <Link to="/admin/view-results">Ver Resultados</Link>
                    </>
                )}
                {role === 'user' && (
                    <>
                        <Link to="/user">Dashboard Usuario</Link>
                        <Link to="/user/register-software">Registrar Software</Link>
                        <Link to="/user/evaluate-software">Evaluar Software</Link>
                    </>
                )}
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

export default Navbar;
