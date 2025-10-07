

import React from "react";
// Bootstrap and FontAwesome are imported globally in main.jsx


const Header = () => {
  return (
    <header>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand fw-bold text-warning" href="#">
            INFINITYPLAY
          </a>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido del menú */}
          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Enlaces de la izquierda */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* Botón Categorías */}
              <li className="nav-item me-2">
                <button
                  className="btn btn-warning d-flex align-items-center shadow-sm px-3 py-2 rounded-pill fw-bold"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCategorias"
                  aria-controls="offcanvasCategorias"
                >
                  <i className="fas fa-th-large me-2"></i>
                  Categorías
                </button>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="index.html">Tienda</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Comunidad</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Noticias</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Opiniones</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Premios</a>
              </li>
            </ul>

            {/* Buscador */}
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
              />
              <button className="btn btn-outline-warning" type="submit">
                🔍
              </button>
            </form>

            {/* Redes sociales */}
            <div className="d-flex align-items-center me-3">
              <a href="#" className="text-light me-2">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="text-light me-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-light me-2">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-youtube"></i>
              </a>
            </div>

            {/* Carrito */}
            <a href="Carrito.html" className="btn btn-warning">
              🛒 Carrito
            </a>
          </div>
        </div>
      </nav>

      {/* Menu lateral (Offcanvas) */}
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
            style={{ background: "#f5f5f5" }}
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
                <i className="fas fa-gamepad me-2 text-warning"></i>PS3
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="fas fa-gamepad me-2 text-warning"></i>PS4
              </a>
            </li>
            <li>
              <a href="Productos.html" className="categoria-link">
                <i className="fas fa-gamepad me-2 text-warning"></i>PS5
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
    </header>
  );
};

export default Header;
