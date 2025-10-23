
import { useCart } from './CartContext';
import '../css/Carrito.css';
import { useNavigate } from "react-router-dom";

export const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  // Función para formatear precios
  const format = (n) => {
    return n.toLocaleString(undefined, { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  };

  // Función para manejar el pago
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    
    navigate("/pago", { state: { total } });
  };

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
              <p>Precio: {format(Number(item.price) || 0)}</p>
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

      <h3>Total: {format(total)}</h3>

      {/* Botón de pago */}
      <button className="checkout-btn" onClick={handleCheckout}>
        Pagar
      </button>
    </div>
  );
};
