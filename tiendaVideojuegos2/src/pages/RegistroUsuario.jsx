/*
  Página: RegistroUsuario
  Propósito: Formulario para crear una cuenta nueva (registro de usuario).
  Comportamiento: valida que los campos estén completos y que las contraseñas coincidan.
  Resultado: actualmente muestra un alert de éxito y redirige a la página principal.
  Nota: lógica de registro es simulada (no hay backend).
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RegistroUsuario.css";

export default function RegistroUsuario() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({  // Estado local para los datos del formulario
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {  // Maneja cambios en los inputs
    const { id, value } = e.target;  // Desestructura id y value del input
    setFormData((prevData) => ({  // Actualiza el estado del formulario
      ...prevData,  // Mantiene los demás campos
      [id]: value,  // Actualiza el campo correspondiente
    }));
  };


  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Previene el envío por defecto

    const { email, name, username, password, confirmPassword } = formData;  // Desestructura los datos del formulario
    // Validaciones básicas
    if (!email || !name || !username || !password || !confirmPassword) {  //Si algún campo está vacío
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {  // Si las contraseñas no coinciden
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

     if (password.length < 6) {  // Si la contraseña es muy corta
      alert("⚠️ La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

     if (username.length < 3) {
      alert("⚠️ El username debe tener al menos 3 caracteres.");
      setLoading(false);
      return;
    }
 try {
      console.log("📤 [Registro] Enviando datos:", { email, name, username });

      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("📥 [Registro] Respuesta:", data);

      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      // Registro exitoso - Guardar tokens automáticamente
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Registro exitoso! Bienvenido " + data.user.name);

      // Redirigir según el rol (aunque por defecto será USER)
      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("❌ [Registro] Error:", error);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/inicioSesion");
  };


  //Diseño del formulario de registro
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



         {/* NombreUsuario */}
        <div className="mb-2">
          <label htmlFor="username" className="form-label">Nombre de  Usuario</label>
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
