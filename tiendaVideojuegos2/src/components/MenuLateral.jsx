import React from 'react';
import '../css/MenuLateral.css';

export default function MenuLateral() {
    return (
      /* Menu lateral (Offcanvas) */
      <div
        className="offcanvas offcanvas-start offcanvas-categorias"
        tabIndex="-1"
        id="offcanvasCategorias"
        aria-labelledby="offcanvasCategoriasLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title text-warning fw-bold"
            id="offcanvasCategoriasLabel"
          >
            <i className="fas fa-th-large me-2"></i>
            Categorías
          </h5>
          <button
            type="button"
            className="btn-close btn-close-black"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>

        <div className="offcanvas-body">
          {/* Perfil de usuario */}
          <div
            className="d-flex align-items-center mb-4 p-2 rounded"
            style={{ background: "#0d0d0d89" }}
          >
            <img
              src="https://ui-avatars.com/api/?name=Invitado&background=222&color=fff"
              alt="Perfil"
              width="48"
              height="48"
              className="rounded-circle me-3"
            />
            <div>
              <div className="fw-bold">Invitado</div>
              <a href="InicioSesion.html" className="btn btn-sm btn-warning mt-1">
                Iniciar sesión
              </a>
            </div>
          </div>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="bi bi-controller me-2 text-warning"></i>PS3
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="bi bi-controller me-2 text-warning"></i>PS4
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="fab fa-playstation me-2 text-warning"></i>PS5
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="fas fa-desktop me-2 text-warning"></i>PC
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="fab fa-xbox me-2 text-success"></i>XBOX
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="fas fa-gamepad me-2 text-danger"></i>NINTENDO
              </a>
            </li>
            <li><hr className="my-2" /></li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-gift me-2 text-primary"></i>GIFT CARD
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-bolt me-2 text-warning"></i>RECARGAS
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-crown me-2 text-warning"></i>MEMBRESIAS
              </a>
            </li>
            <li>
              <a href="Descuentos.html" className="categoria-link">
                <i className="fas fa-box-open me-2 text-info"></i>DESCUENTOS
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-star me-2 text-warning"></i>OPINIONES
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-trophy me-2 text-warning"></i>PREMIOS
              </a>
            </li>
          </ul>
        </div>
      </div>
  )
}