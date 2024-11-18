import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import SoftwareRegistration from './components/SoftwareRegistration';
import EvaluationForm from './components/EvaluationForm';
import RiskMatrix from './components/RiskMatrix';
import Report from './pages/Report';
import AdminManageQuestions from './pages/AdminManageQuestions';
import UserEvaluationResults from './pages/UserEvaluationResults';
import AdminViewEvaluations from './pages/AdminViewEvaluations';
import UserViewSoftware from './pages/UserViewSoftware';
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
    // Obtener el rol del usuario desde el localStorage
    const role = localStorage.getItem('role');

    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard del Administrador */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute>
                            {role === 'admin' ? <AdminHome /> : <Navigate to="/user" />}
                        </ProtectedRoute>
                    } 
                />

                {/* Dashboard del Usuario */}
                <Route 
                    path="/user" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <UserHome /> : <Navigate to="/admin" />}
                        </ProtectedRoute>
                    } 
                />

                {/* Rutas para Usuarios Normales */}
                <Route 
                    path="/user/register-software" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <SoftwareRegistration /> : <Navigate to="/login" />}
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/user/evaluate-software" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <EvaluationForm /> : <Navigate to="/login" />}
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/user/risk-matrix" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <RiskMatrix /> : <Navigate to="/login" />}
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/user/view-reports" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <Report /> : <Navigate to="/login" />}
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/user/view-evaluations" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <UserEvaluationResults /> : <Navigate to="/admin" />}
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/user/view-software" 
                    element={
                        <ProtectedRoute>
                            {role === 'user' ? <UserViewSoftware /> : <Navigate to="/admin" />}
                        </ProtectedRoute>
                    } 
                />

                {/* Rutas para Administradores */}
                <Route 
                    path="/admin/manage-questions" 
                    element={
                        <ProtectedRoute>
                            {role === 'admin' ? <AdminManageQuestions /> : <Navigate to="/user" />}
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/view-evaluations" 
                    element={
                        <ProtectedRoute>
                            {role === 'admin' ? <AdminViewEvaluations /> : <Navigate to="/user" />}
                        </ProtectedRoute>
                    } 
                />

                {/* Redirección por defecto si la ruta no existe */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
