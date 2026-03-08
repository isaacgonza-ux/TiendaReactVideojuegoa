

// components/ProductCard2.jsx
/*
  Component: ProductCard2
  Purpose: Card component for product listings (Catalogo, Descuentos).
  Props:
    - img, titulo, precio, detalles, id
  Behavior: parses price strings, calls addToCart with a normalized product object,
            and links to the product details (SPA `Link`).
*/
/*
  Componente: ProductCard2
  Propósito: Tarjeta de producto para listas/grid en Catálogo y Descuentos.
  Props:
    - img, titulo, precio, detalles, id
  Comportamiento: parsea el precio (si viene como string), llama a addToCart con un objeto normalizado
  y ofrece un enlace `Link` hacia la página de detalles.
*/
import React, { useState } from "react";
import { useCart } from "./CartContext";
import { Link } from 'react-router-dom';
import '../css/ProductCard.css';

export default function ProductCard2({ img, titulo, precio, detalles, id }) {
  const { addToCart } = useCart();  // Hook para acciones del carrito
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    const parsePrice = (val) => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      const cleaned = String(val).replace(/[^0-9]/g, '');
      const n = parseInt(cleaned, 10);
      return isNaN(n) ? 0 : n;
    };

    addToCart({ id, title: titulo, image: img, price: parsePrice(precio), detalles });
    
    // Mostrar confirmación con animación
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{detalles}</p>
        <p className="card-text fw-bold">{precio}</p>
        <div className="d-flex align-items-center mt-2">
          <button className={`btn btn-sm transition-btn ${isAdded ? 'btn-success added-animation' : 'btn-warning'}`} onClick={handleAdd} disabled={isAdded}>
            {isAdded ? '✅ Producto agregado' : '🛒 Comprar'}
          </button>
          {/* detalles a la derecha */}
          <Link to={detalles} className="btn btn-outline-dark btn-sm ms-auto">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
