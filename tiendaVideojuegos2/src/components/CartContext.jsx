
/*
  Componente: CartContext (Provider + hook)
  Propósito: Mantener el estado del carrito en toda la aplicación.
  API expuesta (useCart):
    - cartItems: arreglo de items { id, title, price, image, quantity }
    - addToCart(product): agrega o incrementa un producto
    - removeFromCart(id): elimina un producto por id
    - updateQuantity(id, quantity): actualiza la cantidad de un item
    - total: total derivado (número)
    - clearCart(): vacía el carrito
  Persistencia: guarda/lee `cart` en localStorage.
  Nota: normaliza varias formas de datos (precio en strings con símbolos, distintos campos de imagen, etc.).
*/
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const parsePriceString = (val) => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      // keep only digits (remove currency symbols, spaces, commas and dots used as thousands separators)
      const cleaned = String(val).replace(/[^0-9]/g, '');
      const num = parseInt(cleaned, 10);
      return isNaN(num) ? 0 : num;
    };
    // normalize product shape to ensure cart has consistent fields
    const normalized = {
      id: product.id,
      title: product.title || product.titulo || product.nombre || product.name || "Producto",
      price: parsePriceString(product.price ?? product.precio ?? product.newPrice ?? 0),
      image: product.image || product.img || product.imagen || "",
    };

    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === normalized.id);
      if (exists) {
        return prev.map((item) =>
          item.id === normalized.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...normalized, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    const q = Number(quantity) || 1;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: q } : item))
    );
  };

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 0), 0);
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, total, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
