/**
 * ProductDetailPage.jsx
 * --------------------
 * Página wrapper que usa el componente ProductDetail genérico.
 * Obtiene el slug de la URL y busca los detalles del producto.
 * Si no hay detalles completos, muestra una página en construcción.
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { getProductDetailsBySlug } from '../data/ProductDetailsData';
import { useCart } from '../components/CartContext';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductDetailsBySlug(slug);
  const { addToCart } = useCart();

  if (!product) {
    // Mostrar página en construcción para productos sin detalles aún
    return (
      <div className="dark-bg overlay-dark" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center py-5">
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔨</div>
          <h1 className="text-warning mb-4">En Construcción</h1>
          <p className="text-white mb-4">
            Los detalles de este producto están siendo preparados.
          </p>
          <p className="text-muted mb-4">
            Por favor, vuelve pronto para obtener más información.
          </p>
          <button 
            className="btn btn-warning me-2"
            onClick={() => navigate('/')}
          >
            ← Volver a Home
          </button>
          <button 
            className="btn btn-outline-warning"
            onClick={() => navigate('/catalogo')}
          >
            Ver Catálogo
          </button>
        </div>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
