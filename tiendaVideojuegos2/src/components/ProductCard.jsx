
/*
  Componente: ProductCard
  Propósito: Tarjeta de producto compacta usada en la página Home (Estrenos, Ofertas, Más vendidos).
  Props:
    - product: objeto con campos como { id, title, img, oldPrice, newPrice, detallesLink }
  Comportamiento: muestra imagen, título, precios y botones para comprar/añadir; usa useCart para agregar al carrito.
  Nota: presentacional y pensado para listas pequeñas en Home.
*/
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import '../css/ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // Hook para acciones del carrito
  const [isAdded, setIsAdded] = useState(false);

  // Manejar click en botón de comprar con animación
  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Resetear el estado después de 2 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card h-100 shadow product-card">
        <img src={product.img} className="card-img-top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="text-muted text-decoration-line-through">{product.oldPrice}</p>
          <p className="fw-bold fs-5 text-success">{product.newPrice}</p>
          <button
            className={`btn w-100 mb-2 transition-btn ${isAdded ? 'btn-success added-animation' : 'btn-warning'}`}
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? '✅ Producto agregado' : '🛒 Comprar'}
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
