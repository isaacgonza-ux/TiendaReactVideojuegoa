
import ProductCard2 from "../components/ProductCard2";
import { descuentos } from "../data/DescuentosData";



export default function Descuentos() {
  return (
    <div className="bg-dark text-white min-vh-100">
      <div className="container py-5">
        <h2 className="text-center text-warning mb-4">
          🎮 Catálogo de Videojuegos 🎮
        </h2>

        <div className="row row-cols-1 row-cols-md-5 g-4">
          {descuentos.map((p) => (
            <ProductCard2
              key={p.id}
              id={p.id}
              img={p.img}
              titulo={p.titulo}
              precio={`$${p.precio.toLocaleString()}`}
              detalles={p.detalles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// pages/catalogo.jsx
// import productos from "../data/Productos";
// import ProductCard2 from "../components/ProductCard2";

// export default function Catalogo() {
//   return (
//     <div className="container my-5 bg-white text-dark">
//       <h2 className="text-center text-warning mb-4">
//         🎮 Catálogo de Videojuegos 🎮
//       </h2>

//       <div className="row row-cols-1 row-cols-md-5 g-4">
//         {productos.map((p) => (
//           <ProductCard2
//             key={p.id}
//             id={p.id}
//             img={p.img}
//             titulo={p.titulo}
//             precio={`$${p.precio.toLocaleString()}`}
//             detalles={p.detalles}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
