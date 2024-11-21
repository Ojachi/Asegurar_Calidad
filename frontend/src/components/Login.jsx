import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Llamamos a la función de login y verificamos el rol
      const response = await login(cedula, password);
      // Redirigir al usuario basado en su rol
      if (response.role === 0) {
        
        alert("inicio de sesion exitoso. Redirigiendo Dashboard de admin...")
        setTimeout(() => navigate("/admin"), 2000);
      } else {
        
        alert("inicio de sesion exitoso. Redirigiendo Dashboard de usuario...")
        setTimeout(() => navigate("/user"), 2000);
      }
    } catch (err) {
      alert("Error al iniciar sesion")
    }

  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        <input
          placeholder="Ingrese su cedula"
          type="number"
          value={cedula}
          name=""
          onChange={(e) => setCedula(e.target.value)}
          required
        />
        <input
          placeholder="Ingrese su contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
    
  );
};

export default Login;
