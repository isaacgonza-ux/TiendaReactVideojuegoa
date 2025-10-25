
// import React from "react";

// export default function ProductoCard({ img, titulo, precio, detalles }) {
//   return (
//     <div className="col">
//       <div className="card h-100 shadow-sm">
//         <img src={img} className="card-img-top" alt={titulo} />
//         <div className="card-body text-center">
//           <h6 className="card-title">{titulo}</h6>
//           <p className="text-muted">{precio}</p>
//           <button className="btn btn-warning w-100 mb-2">🛒 Comprar</button>
//           <div className="d-flex justify-content-between">
//             <button
//               className="btn btn-outline-dark btn-sm"
//               onClick={() => (window.location.href = detalles)}
//             >
//               Detalles
//             </button>
//             <button className="btn btn-outline-dark btn-sm">Añadir</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
import React from "react";
import { useCart } from "./CartContext";
import { Link } from 'react-router-dom';

export default function ProductCard2({ img, titulo, precio, detalles, id }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    const parsePrice = (val) => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      const cleaned = String(val).replace(/[^0-9]/g, '');
      const n = parseInt(cleaned, 10);
      return isNaN(n) ? 0 : n;
    };

    addToCart({ id, title: titulo, image: img, price: parsePrice(precio), detalles });
  };

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{detalles}</p>
        <p className="card-text fw-bold">{precio}</p>
        <div className="d-flex align-items-center mt-2">
          <button className="btn btn-warning btn-sm" onClick={handleAdd}>
            🛒 Comprar
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
