import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const Login = () => {
    const role = localStorage.getItem("role");
    if (!role) {
      return (
        <Link to="/login" className="nav-link">
          Iniciar sesion
        </Link>
      );
    } else {
      return (
        <Link onClick={handleLogout} className="nav-link">
          Cerrar Sesion
        </Link>
      );
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            QualiCheck
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/register-software">
                  Registro de software
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/evaluate-software">
                  Evaluación Integral
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Resultados
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/AboutUs">
                  Sobre nosotros
                </a>
              </li>
              <li className="nav-item">
                {Login()}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet></Outlet>

      <footer className="bg-secondary text-white pt-5 pb-4">
        <div className="container text-center text-md-start">
          <div className="row text-center text-md-start">
            <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold">QualiCheck</h5>
              <p>
                Evalúa, mejora y asegura la calidad de tu software de forma
                eficiente.
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
              <p>
                <i className="fas fa-home"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope"></i> qualicheck@gmail.com
              </p>
              <p>
                <i className="fas fa-phone"></i> +01 234 567 88
              </p>
            </div>

            <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
              <a
                href="https://facebook.com"
                className="btn btn-primary btn-floating m-1"
                role="button"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                className="btn btn-primary btn-floating m-1"
                role="button"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://x.com/"
                className="btn btn-info btn-floating m-1"
                role="button"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://github.com/"
                className="btn btn-dark btn-floating m-1"
                role="button"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/"
                className="btn btn-primary btn-floating m-1"
                role="button"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Navbar;
