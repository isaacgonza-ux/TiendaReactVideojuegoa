import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Si usas react-router-dom
import "../Css/InicioSesion.css"; // Asegúrate de tener este archivo CSS

export default function Login({ setIsAdminLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Para redirigir

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    if(email === "admin@tiendagamer.com" && password === "admin") {
      alert("✅ Inicio de sesión exitoso. ¡Bienvenido, Admin!");
     setIsAdminLogged(true);
      navigate("/admin");
      
    }else{
      alert("❌ Usuario o contraseña incorrectos. Inténtalo de nuevo.");
    }

    
  };

  return (
      <div className="fondo-iniciar-Sesion d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="communitymember@sage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón Iniciar sesión */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-warning text-center">
              Iniciar sesión
            </button>
          </div>

          {/* Enlaces adicionales */}
          <div className="d-flex justify-content-between">
            <a href="#" className="text-muted">
              ¿Has olvidado la contraseña?
            </a>
            <a href="/RegistroUsuario" className="text-muted">
              ¿Eres un usuario nuevo? Crear cuenta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
