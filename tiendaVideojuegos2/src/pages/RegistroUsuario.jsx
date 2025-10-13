import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/RegistroUsuario.css";

export default function RegistroUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, password, confirmPassword } = formData;

    // Validaciones básicas
    if (!email || !name || !password || !confirmPassword) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    // Si todo está correcto, redirige (simulado)
    alert("✅ Registro exitoso. ¡Bienvenido!");
    navigate("/"); // redirige a inicio de sesión o página principal
  };

  const handleCancel = () => {
    navigate("/"); // Vuelve a inicio de sesión
  };

  return (
     <div className="registro-fondo d-flex justify-content-center align-items-center vh-100">
    <div className="form-container p-4 mx-auto mt-5 shadow rounded" style={{ maxWidth: "400px", backgroundColor: "white" }}>
      {/* Mensaje de descuento */}
      <div className="discount-message d-flex justify-content-between align-items-center mb-3">
        <span className="discount-text fw-bold text-warning">20% de descuento por registrarte</span>
        <span className="discount-icon fs-4">🎮</span>
        
      </div>

      <h4 className="text-center mb-3 fw-bold">Crea tu cuenta</h4>

      <form onSubmit={handleSubmit}>
        {/* E-mail */}
        <div className="mb-2">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="communitymember@sage.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Nombre */}
        <div className="mb-2">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Juan"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contraseña */}
        <div className="mb-2">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botones */}
        <div className="d-grid mb-2">
          <button type="submit" className="btn btn-warning fw-bold text-dark">
            Registrarse
          </button>
        </div>

        <div className="d-grid">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>

    </div>

    </div>
  );
}
