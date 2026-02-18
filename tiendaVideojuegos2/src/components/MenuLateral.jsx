
/*
  Componente: MenuLateral (Offcanvas de Categorías)
  Propósito: Mostrar un panel lateral con categorías y enlaces relacionados.
  Comportamiento: utiliza `CategoryLink` para que el offcanvas se cierre antes de navegar.
  Nota: markup preparado para integrarse con Bootstrap offcanvas.
*/
import React from 'react';
import { Link } from 'react-router-dom';
import CategoryLink from './CategoryLink';
import "../css/MenuLateral.css"





export default function MenuLateral() {
  // use CategoryLink component for category navigation which closes the offcanvas and navigates
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
             <Link to="/inicioSesion" className="text-decoration-none text-warning fw-bold">
                Invitado
              </Link>
            </div>
          </div>

          <ul className="list-unstyled mb-0">
            <li>
              <CategoryLink to="/catalogo" className="categoria-link">
                <i className="bi bi-joystick me-2 text-warning"></i>PS3
              </CategoryLink>
            </li>
            <li>
              <CategoryLink to="/catalogo" className="categoria-link">
                <i className="bi bi-controller me-2 text-warning"></i>PS4
              </CategoryLink>
            </li>
            <li>
              <CategoryLink to="/catalogo" className="categoria-link">
                <i className="bi bi-playstation me-2 text-warning"></i>PS5
              </CategoryLink>
            </li>
            <li>
              <CategoryLink to="/catalogo" className="categoria-link">
                <i className="bi bi-pc-display me-2 text-warning"></i>PC
              </CategoryLink>
            </li>
            <li>
              <CategoryLink to="/catalogo" className="categoria-link">
                <i className="bi bi-xbox me-2 text-success"></i>XBOX
              </CategoryLink>
            </li>
            <li>
              <CategoryLink to="/catalogo" className="categoria-link">
                <i className="bi bi-nintendo-switch me-2 text-danger"></i>NINTENDO
              </CategoryLink>
            </li>
            <li><hr className="my-2" /></li>
            <li>
              <a href="#" className="categoria-link">
                <i className="bi bi-credit-card-2-front-fill me-2 text-primary"></i>GIFT CARD
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="bi bi-wallet-fill me-2 text-warning"></i>RECARGAS
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-crown me-2 text-warning"></i>MEMBRESIAS
              </a>
            </li>
            <li>
              <a href="Descuentos.html" className="categoria-link">
                <i className="bi bi-currency-dollar me-2 text-info"></i>DESCUENTOS
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="fas fa-star me-2 text-warning"></i>OPINIONES
              </a>
            </li>
            <li>
              <a href="#" className="categoria-link">
                <i className="bi bi-trophy-fill me-2 text-warning"></i>PREMIOS
              </a>
            </li>
          </ul>
        </div>
      </div>
  )
}