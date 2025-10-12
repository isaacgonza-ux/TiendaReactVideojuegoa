
import React from "react";
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow">
        <img src={product.img} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="text-muted text-decoration-line-through">{product.oldPrice}</p>
          <p className="fw-bold fs-5 text-success">{product.newPrice}</p>
          <button
            className="btn btn-warning w-100 mb-2"
            onClick={() => window.location.href = product.carritoLink}
          >
            🛒 Comprar
          </button>
          <div className="d-flex justify-content-between">
            <Link to={product.detallesLink} className="btn btn-outline-dark btn-sm">
              Detalles
            </Link>
            <button className="btn btn-outline-dark btn-sm">Añadir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
