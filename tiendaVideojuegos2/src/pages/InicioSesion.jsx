/*
  Página: InicioSesion
  Propósito: Formulario de login para usuarios y administrador.
  Comportamiento: valida campos simples; si las credenciales son de admin
  activa `setIsAdminLogged(true)` y redirige al panel de administrador.
  Nota: actualmente la autenticación es simulada (hard-coded) para demo.
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../css/InicioSesion.css"

export default function Login() { 
  const [email, setEmail] = useState("");  // Estado local para el email
  const [password, setPassword] = useState(""); // Estado local para la contraseña
  const navigate = useNavigate(); // Para redirigir

 const handleSubmit = async(e) => { // Maneja el envío del formulario
  e.preventDefault(); // Previene el envío por defecto

  if (email.trim() === "" || password.trim() === "") { // Validación básica
    alert("⚠️ Por favor completa todos los campos.");
    return; // Detiene la ejecución si hay campos vacíos
  }

  try {
    const response = await fetch("http://localhost:8080/auth/login", { // Llama al endpoint de login
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ // Envía email y contraseña en el cuerpo
        email: email,   
        password: password
      }),
    });
    
    if (!response.ok) { // Si la respuesta no es OK
      const errorData = await response.json(); // Extrae el mensaje de error
      alert(`❌ ${errorData.message || 'Usuario o contraseña incorrectos'}`); // Muestra el mensaje de error
      return; // Detiene la ejecución
    }

    const data = await response.json(); // Extrae los datos de la respuesta
    console.log("✅ Respuesta completa del servidor:", data);
    console.log("✅ Usuario:", data.user);
    console.log("✅ Role:", data.user.role);

    // Guardar en localStorage
    localStorage.setItem("token", data.token); // Guardar token de acceso
    localStorage.setItem("refreshToken", data.refreshToken); // Guardar token de refresco
    localStorage.setItem("user", JSON.stringify(data.user)); // Guardar datos del usuario

    console.log("✅ Guardado en localStorage");
    console.log("Token guardado:", localStorage.getItem("token"));
    console.log("User guardado:", localStorage.getItem("user"));

    alert("✅ Inicio de sesión exitoso!");

    // Redirigir según el rol
    if (data.user.role === "ADMIN") {
      console.log("🎯 Redirigiendo a /admin");
      navigate("/admin");
    } else {
      console.log("🎯 Redirigiendo a /");
      navigate("/");
    }

  } catch (error) {
    alert("⚠️ Error al conectar con el servidor.");
    console.error("Error completo:", error);
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
              onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado del email
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
              onChange={(e) => setPassword(e.target.value)}   // Actualiza el estado de la contraseña
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
