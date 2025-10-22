
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminNavbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Panel de Administración</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/admin/productos"
                className={`nav-link ${pathname.includes("productos") ? "active text-warning" : ""}`}
              >
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/usuarios"
                className={`nav-link ${pathname.includes("usuarios") ? "active text-warning" : ""}`}
              >
                Usuarios
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
