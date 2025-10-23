
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
import React from "react";
import { useCart } from "./CartContext";

export default function ProductCard2({ img, titulo, precio, detalles, id }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, img, titulo, precio: parseFloat(precio.replace("$", "").replace(",", "")), detalles });
  };

  return (
    <div className="card h-100">
      <img src={img} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{detalles}</p>
        <p className="card-text fw-bold">{precio}</p>
        <button className="btn btn-warning" onClick={handleAdd}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
