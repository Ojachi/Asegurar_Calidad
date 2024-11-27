import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UserHome from "./pages/UserHome";
import RiskMatrix from "./components/RiskMatrix";
import AdminManageQuestions from "./pages/AdminManageQuestions";
import UserEvaluationResults from "./pages/UserEvaluationResults";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import EvaluationPage from "./pages/EvaluationPage";
import EvaluationForm from "./components/EvaluationForm";

function AppRoutes() {
  // Obtener el rol del usuario desde el localStorage
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* Rutas públicas */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route index element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />

          {/* Dashboard del Usuario */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserHome /> 
              </ProtectedRoute>
            }
          />

          {/* Rutas para Usuarios Normales */}
          <Route
            path="/user/evaluate-software"
            element={
              <ProtectedRoute>
                {localStorage.getItem('role') === "1" ? <EvaluationPage /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/evaluate"
            element={
              <ProtectedRoute>
                {localStorage.getItem('role') === "1" ? <EvaluationForm /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/risk-matrix"
            element={
              <ProtectedRoute>
                {localStorage.getItem('role') === "1" ? <RiskMatrix /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/view-evaluations"
            element={
              <ProtectedRoute>
                {localStorage.getItem('role') === "1" ? (
                  <UserEvaluationResults />
                ) : (
                  <Navigate to="/admin" />
                )}
              </ProtectedRoute>
            }
          />
          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/NotFound" />} />
        </Route>

        {/* Rutas para Administradores */}
        <Route
          path="/admin/manage-questions"
          element={
            <ProtectedRoute>
              {localStorage.getItem('role') === '0' ? (
                <AdminManageQuestions />
              ) : (
                <Navigate to="/user" />
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
