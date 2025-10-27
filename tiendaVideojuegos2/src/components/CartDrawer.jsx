/**
 * CartDrawer.jsx
 * ----------------
 * Componente que muestra el carrito en un panel deslizable (drawer).
 * 
 *
 * Propósito:
 * - Mostrar los artículos actualmente en el carrito (desde `CartContext`).
 * - Permitir cambiar la cantidad, eliminar ítems y proceder al checkout.
 *
 * Props:
 * - isOpen: boolean -> controla si el drawer está abierto o cerrado.
 * - toggleCart: function -> callback para abrir/cerrar el drawer.
 *
 * Comportamiento / efectos:
 * - Consume `useCart()` para leer `cartItems`, `removeFromCart`, `updateQuantity` y `total`.
 * - Al presionar "Pagar" valida que haya artículos y navega a `/checkout` pasando el total en el estado.
 * - No modifica directamente el almacenamiento local; la lógica de persistencia está en `CartContext`.
 *
 * Notas de implementación:
 * - Los precios se formatean usando Intl (CLP por defecto) y se convierten con Number(...) en caso de strings.
 * - Mantener funciones puras y no forzar efectos secundarios aquí (ej.: limpiar carrito) — eso se hace en el flujo de pago.
 */

import { useCart } from './CartContext';
import '../css/Carrito.css';
import { useNavigate } from "react-router-dom";

export const CartDrawer = ({ isOpen, toggleCart }) => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  // Función para formatear precios
  const format = (n) => {
    return n.toLocaleString(undefined, { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }); // Formatea como CLP
  };

  // Función para manejar el pago
  const handleCheckout = () => {
    if (cartItems.length === 0) { //Si el carrito está vacío, muestra alerta
      alert("Tu carrito está vacío.");
      return;
    }
    
    navigate("/checkout", { state: { total } });  // Navega a checkout pasando el total
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>  {/* Aplica clase 'open' si isOpen es true */}
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
