import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import SoftwareRegistration from "./components/SoftwareRegistration";
import EvaluationForm from "./components/EvaluationForm";
import RiskMatrix from "./components/RiskMatrix";
import Report from "./pages/Report";
import AdminManageQuestions from "./pages/AdminManageQuestions";
import UserEvaluationResults from "./pages/UserEvaluationResults";
import AdminViewEvaluations from "./pages/AdminViewEvaluations";
import UserViewSoftware from "./pages/UserViewSoftware";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";

function AppRoutes() {
  // Obtener el rol del usuario desde el localStorage
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* Rutas públicas */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route index element={<Home />} />
          <Route path='/AboutUs' element={<AboutUs/>}/>
          

          {/* Dashboard del Usuario */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                {role === "1" ? <UserHome /> : <Navigate to="/admin" />}
              </ProtectedRoute>
            }
          />

          {/* Rutas para Usuarios Normales */}
          <Route
            path="/user/register-software"
            element={
              <ProtectedRoute>
                {role === "1" ? (
                  <SoftwareRegistration />
                ) : (
                  <Navigate to="/login" />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/evaluate-software"
            element={
              <ProtectedRoute>
                {role === "1" ? <EvaluationForm /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/risk-matrix"
            element={
              <ProtectedRoute>
                {role === "1" ? <RiskMatrix /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/view-reports"
            element={
              <ProtectedRoute>
                {role === "1" ? <Report /> : <Navigate to="/login" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/view-evaluations"
            element={
              <ProtectedRoute>
                {role === "1" ? (
                  <UserEvaluationResults />
                ) : (
                  <Navigate to="/admin" />
                )}
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/view-software"
            element={
              <ProtectedRoute>
                {role === "1" ? <UserViewSoftware /> : <Navigate to="/admin" />}
              </ProtectedRoute>
            }
          />
          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/NotFound" />} />
        </Route>


        {/* Dashboard del Administrador */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {role === "0" ? <AdminHome /> : <Navigate to="/user" />}
            </ProtectedRoute>
          }
        />
        {/* Rutas para Administradores */}
        <Route
          path="/admin/manage-questions"
          element={
            <ProtectedRoute>
              {role === "0" ? (
                <AdminManageQuestions />
              ) : (
                <Navigate to="/user" />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-evaluations"
          element={
            <ProtectedRoute>
              {role === "0" ? (
                <AdminViewEvaluations />
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
