import React from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import AdminProd from "../pages/AdminProd";
import AdminUser from "../pages/AdminUser";

export default function AdminPanel() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>

      {/* Menú de navegación interno */}
      <nav className="mb-4">
        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <Link to="/admin/productos" className="nav-link">
              🕹️ Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/usuarios" className="nav-link">
              👥 Usuarios
            </Link>
          </li>
        </ul>
      </nav>

      {/* Rutas internas del panel */}
      <div className="border rounded p-4 bg-dark text-light shadow">
        <Routes>
          <Route path="/" element={<Navigate to="productos" />} />
          <Route path="productos" element={<AdminProd />} />
          <Route path="usuarios" element={<AdminUser />} />
        </Routes>
      </div>
    </div>
  );
}
