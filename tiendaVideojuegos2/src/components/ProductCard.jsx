
/*
  Componente: ProductCard
  Propósito: Tarjeta de producto compacta usada en la página Home (Estrenos, Ofertas, Más vendidos).
  Props:
    - product: objeto con campos como { id, title, img, oldPrice, newPrice, detallesLink }
  Comportamiento: muestra imagen, título, precios y botones para comprar/añadir; usa useCart para agregar al carrito.
  Nota: presentacional y pensado para listas pequeñas en Home.
*/
import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // Hook para acciones del carrito
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
            onClick={() => addToCart(product)}
          >
            🛒 Comprar
          </button>
          <div className="d-flex justify-content-between">
            <Link to={product.detallesLink} className="btn btn-outline-dark btn-sm">
              Detalles
            </Link>
            <button className="btn btn-outline-dark btn-sm" onClick={() => addToCart(product)}>Añadir</button>
          </div>
        </div>
      </div>
    </div>
  );
}
