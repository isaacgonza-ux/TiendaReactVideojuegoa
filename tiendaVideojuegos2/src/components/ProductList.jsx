// components/ProductList.jsx
import productos from '../data/Productos'
import { useCart } from './CartContext';

export const ProductList = () => {
  const { addToCart } = useCart();

  const format = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  return (
    <div className="product-list">
      {productos.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.img || p.image} alt={p.title || p.titulo} width="100" />
          <h3>{p.title || p.titulo}</h3>
          <p>{format(p.precio ?? p.price ?? 0)}</p>
          <button onClick={() => addToCart(p)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
};
