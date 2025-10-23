// components/CartDrawer.jsx
import { useCart } from './CartContext';
import '../css/Carrito.css';

export const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={toggleCart}>✖</button>
      <h2>🛒 Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="item-info">
              <h4>{item.title}</h4>
              <p>Precio: ${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};
