/*
  Página: RegistroUsuario
  Propósito: Formulario para crear una cuenta nueva (registro de usuario).
  Comportamiento: valida que los campos estén completos y que las contraseñas coincidan, 
  luego envía los datos a la API REST.
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegistroUsuario.css";

export default function RegistroUsuario() {
  const navigate = useNavigate();
  
  // Estados para manejar la UI
  const [loading, setLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setMensajeExito("");

    const { email, name, username, password, confirmPassword } = formData;

    // Validaciones básicas del lado del cliente
    if (!email || !name || !username || !password || !confirmPassword) {
      setMensajeError("⚠️ Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setMensajeError("❌ Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) { // Cambiado a 8 para que coincida con tu mensaje original
      setMensajeError("⚠️ La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (username.length < 3) {
      setMensajeError("⚠️ El username debe tener al menos 3 caracteres.");
      return;
    }
    
    setLoading(true);

    try {
      // Petición a la API REST
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviamos solo lo que el backend necesita (ignoramos confirmPassword)
        body: JSON.stringify({ email, name, username, password }), 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setMensajeError(`❌ ${errorData.message || 'El correo electrónico o usuario ya están en uso.'}`);
        return;
      }

      setMensajeExito("✅ Registro exitoso! Redirigiendo...");

      // Redireccionar al login después de un breve momento
      setTimeout(() => {
        navigate("/inicioSesion");
      }, 1500);

    } catch (error) {
      console.error("Error en el registro:", error);
      setMensajeError("⚠️ Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/inicioSesion");
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

          {/* Nombre de Usuario */}
          <div className="mb-2">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Juan"
              value={formData.username}
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

          {/* Alertas de Mensajes */}
          {mensajeError && (
            <div className="alert alert-danger text-center mb-3 p-2" role="alert">
              {mensajeError}
            </div>
          )}

          {mensajeExito && (
            <div className="alert alert-success text-center mb-3 p-2" role="alert">
              {mensajeExito}
            </div>
          )}

          {/* Botones */}
          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-warning fw-bold text-dark" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </div>

          <div className="d-grid">
            <button type="button" onClick={handleCancel} className="btn btn-secondary" disabled={loading}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}