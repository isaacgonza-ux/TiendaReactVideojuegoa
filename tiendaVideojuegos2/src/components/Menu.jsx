

/*
  Componente: Menu (Header)
  Propósito: Barra de navegación principal con marca, enlaces, buscador y botón de carrito.
  Props:
    - toggleCart: función que abre/cierra el drawer del carrito (pasada desde App).
  Comportamiento: usa markup de Bootstrap para ser responsive; la mayoría de links usan react-router.
*/
import React from "react";
import { Link } from "react-router-dom";



const Header = ({ toggleCart }) => {
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
                  <i className="bi bi-grid-fill me-2"></i>
                  Categorías
                </button>
              </li>

              <li className="nav-item">
                <Link to={"/"} className="nav-link">Tienda</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Comunidad</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Noticias</a>
              </li>
              <li className="nav-item">
                 <Link to={"/catalogo"} className="nav-link">Catalogo</Link>
              </li>
              <li className="nav-item">
                  <Link to={"/descuentos"} className="nav-link">Descuentos</Link>
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
            <div className="d-flex align-items-center me-3 social-icons">
              <a href="#" className="text-light me-2">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="#" className="text-light me-2">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light me-2">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-youtube"></i>
              </a>
            </div>

            {/* Carrito */}
            <button type="button" className="btn btn-warning" onClick={toggleCart}>
              🛒 Carrito
            </button>
          </div>
        </div>
      </nav>

      </header>

    );
};

export default Header;
