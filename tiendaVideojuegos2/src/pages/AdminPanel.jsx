/**
 * 
 * -----------------------------
 * Página: Panel de Administración Principal
 * 
 * Propósito:
 * - Actúa como contenedor principal para las diferentes secciones administrativas.
 * - Proporciona navegación interna entre las vistas de admin (productos, usuarios, órdenes).
 * - Renderiza el contenido de cada sección usando rutas anidadas.
 * 
 Seguridad:
 * - Este componente está protegido por la validación isAdminLogged en App.jsx
 * - Si el usuario no está autenticado como admin, será redirigido a /inicioSesion
 *
 * 
 * Notas técnicas:
 * - Usa Routes anidadas de react-router-dom v6
 * - La navegación interna preserva el estado de admin
 * - El contenido se renderiza dentro de un contenedor con padding y sombra
 */

import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import AdminProd from "../pages/AdminProd";
import AdminUser from "../pages/AdminUser";

export default function AdminPanel() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>

      {/* Menú de navegación interno usando tabs de Bootstrap */}
      <nav className="mb-4">
        <ul className="nav nav-tabs justify-content-center">
          {/* Tab Productos: gestión del catálogo de videojuegos */}
          <li className="nav-item">
            <Link to="/admin/productos" className="nav-link">
              🕹️ Productos
            </Link>
          </li>
          {/* Tab Usuarios: administración de cuentas/permisos */}
          <li className="nav-item">
            <Link to="/admin/usuarios" className="nav-link">
              👥 Usuarios
            </Link>
          </li>
          {/* Tab Órdenes: vista de pedidos guardados en localStorage */}
          <li className="nav-item">
            <Link to="/admin/orders" className="nav-link">
              📦 Órdenes
            </Link>
          </li>
        </ul>
      </nav>

      {/* Contenedor de contenido con rutas anidadas */}
      <div className="border rounded p-4 bg-dark text-light shadow">
        <Routes>
          {/* Ruta por defecto: redirige a la vista de productos */}
          <Route path="/" element={<Navigate to="productos" />} />
          
          {/* Vista de gestión de productos (catálogo) */}
          <Route path="productos" element={<AdminProd />} />
          
          {/* Vista de gestión de usuarios */}
          <Route path="usuarios" element={<AdminUser />} />
          
          {/* Nota: la ruta /admin/orders está definida en App.jsx */}
        </Routes>
      </div>
    </div>
  );
}
