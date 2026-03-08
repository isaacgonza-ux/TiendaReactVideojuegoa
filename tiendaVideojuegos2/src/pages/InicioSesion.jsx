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

export default function Login({ setIsAdminLogged }) { 
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [email, setEmail] = useState("");  // Estado local para el email
  const [password, setPassword] = useState(""); // Estado local para la contraseña
  const navigate = useNavigate(); // Para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeError("");
    setMensajeExito("");

    if (email.trim() === "" || password.trim() === "") {
      setMensajeError("⚠️ Por favor completa todos los campos.");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setMensajeError(`❌ ${errorData.message || 'Usuario o contraseña incorrectos'}`);
        return;
      }

      const data = await response.json();

      // Guardar en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMensajeExito("✅ Inicio de sesión exitoso!");

      const role = (data.user && data.user.role) ? String(data.user.role).toUpperCase() : "";
      if (typeof setIsAdminLogged === "function") {
        setIsAdminLogged(role === "ADMIN");
      }
      
      // Redireccionar después de un momento
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setMensajeError("⚠️ Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
      <div className="fondo-iniciar-Sesion d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: "400px"}}>
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

          {mensajeError && (
            <div className="alert alert-danger text-center mb-3" role="alert">
              {mensajeError}
            </div>
          )}

          {mensajeExito && (
            <div className="alert alert-success text-center mb-3" role="alert">
              {mensajeExito}
            </div>
          )}

          {/* Botón Iniciar sesión */}
         <div className="d-grid mb-3">
          <button type="submit" className="btn btn-warning text-center" disabled={cargando}>
            {cargando ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Cargando...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </div>

          {/* Enlaces adicionales */}
          <div className="d-flex flex-column flex-md-row justify-content-between text-center mt-3 gap-2">
            <a href="#" className="text-muted small text-decoration-none">
              ¿Has olvidado la contraseña?
            </a>
            <a href="/RegistroUsuario" className="text-muted small text-decoration-none">
              ¿Eres un usuario nuevo? Crear cuenta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
