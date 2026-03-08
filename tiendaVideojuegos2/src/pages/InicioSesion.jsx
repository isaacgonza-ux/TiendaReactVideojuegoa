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

  const handleSubmit = async (e) => { // Maneja el envío del formulario
    e.preventDefault(); // Previene el envío por defecto 

    setMensajeError("");

    if (email.trim() === "" || password.trim() === "") { // Validación básica
      setMensajeError("⚠️ Por favor completa todos los campos.");
      return; // Detiene la ejecución si hay campos vacíos
    }



    setCargando(true);

    try{

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Cargar usuarios desde localStorage y añadir admin
    const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
    const users = [
      { email: "admin@gmail.com", password: "admin", role: "ADMIN", name: "Admin" },
      ...registeredUsers
    ];

    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      // Guardar en localStorage
      localStorage.setItem("token", "dummy-token-for-" + foundUser.email); // Guardar token de acceso
      localStorage.setItem("user", JSON.stringify(foundUser)); // Guardar datos del usuario

      setMensajeExito("✅ Inicio de sesión exitoso!");

      // Normalizar rol y actualizar estado de admin en App
      const role = (foundUser.role) ? String(foundUser.role).toUpperCase() : "";
      if (typeof setIsAdminLogged === "function") {
        setIsAdminLogged(role === "ADMIN");
      }

      // Retrasamos la redirección 1.5 segundos para que se alcance a ver el mensaje
        setTimeout(() => {
          if (role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/perfilUsuario");
          }
        }, 1500);

      
     
    } else {
      setMensajeError("❌ Usuario o contraseña incorrectos");
      setCargando(false);
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    setMensajeError("Error al iniciar sesión.")
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
