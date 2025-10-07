
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row align-items-center">

          {/* Logo y empresa */}
          <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
            <img
              src="/img/gatogamerlogo.png"
              alt="logo"
              width="100"
              className="mb-2 rounded-circle"
            />
            <div>
              <small>&copy; 2025 INFINITYPLAY. Todos los derechos reservados.</small>
            </div>
            <div>
              <small>Creado por Isaac y Almendra</small>
            </div>
          </div>

          {/* Información de la empresa */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h6 className="text-warning">Información</h6>
            <small>
              Venta de videojuegos digitales, gift cards y membresías.<br />
              Entrega inmediata y soporte 24/7.<br />
              Santiago, Chile
            </small>
            <div>
              <a href="Nosotros.html" style={{ color: "orange" }}>Nosotros</a>
            </div>
          </div>

          {/* Contacto y redes sociales */}
          <div className="col-md-4 text-center text-md-end">
            <h6>
              <a href="contacto.html" className="text-warning text-decoration-none">Contacto</a>
            </h6>
            <small>
              <i className="fas fa-envelope"></i> contacto@infinityplay.cl<br />
              <i className="fas fa-phone"></i> +56 9 1234 5678
            </small>
            <div className="mt-2">
              <a href="#" className="text-light me-3 fs-4"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-light me-3 fs-4"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light me-3 fs-4"><i className="fab fa-whatsapp"></i></a>
              <a href="#" className="text-light fs-4"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
