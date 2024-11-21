import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [cedula, setCedula] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(cedula, username, email, password);
      alert("registro Exitoso, te redirigiremos a el login")
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      alert("Error: " + err.message)
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleRegister}>
        <h2>Registro</h2>
          <input
            placeholder="Digite su cedula"
            type="number"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <input
            placeholder="Usuario"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
