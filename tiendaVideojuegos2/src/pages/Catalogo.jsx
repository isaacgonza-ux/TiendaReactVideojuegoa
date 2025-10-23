
import ProductCard2 from "../components/ProductCard2";
import productos from "../data/Productos";


export default function catalogo() {
  return (
    <div className="container my-5 bg-white text-dark">
      <h2 className="text-center text-warning mb-4">
        🎮 Catálogo de Videojuegos 🎮
      </h2>

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {productos.map((p) => (
          <ProductCard2
            key={p.id}
            img={p.img}
            titulo={p.titulo}
            precio={`$${p.precio.toLocaleString()}`}
            detalles={p.detalles}
          />
        ))}
      </div>
    </div>
  );
}
