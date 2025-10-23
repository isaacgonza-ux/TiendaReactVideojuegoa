// components/ProductList.jsx
import productos from '../data/Productos'
import { useCart } from './CartContext';

export const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div className="product-list">
      {productos.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.title} width="100" />
          <h3>{p.title}</h3>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
};
