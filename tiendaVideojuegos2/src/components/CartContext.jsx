
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

export const CartProvider = ({ children }) => {   // Componente proveedor del contexto
  const [cartItems, setCartItems] = useState([]);

  
  useEffect(() => {
    const stored = localStorage.getItem('cart');  // muestra lo guardado en el localStorage
    if (stored) setCartItems(JSON.parse(stored));  // Parsea y establece el carrito
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));  // Guarda el carrito en localStorage
  }, [cartItems]);  // cada vez que cartItems cambie, se guarda en localStorage


/// Agrega un producto al carrito o incrementa su cantidad
  const addToCart = (product) => {
    const parsePriceString = (val) => {
      if (typeof val === 'number') return val;
      if (!val) return 0;
      //mantener solo dígitos (elimina símbolos de moneda, espacios, comas y puntos usados como separadores de miles)
      const cleaned = String(val).replace(/[^0-9]/g, '');
      const num = parseInt(cleaned, 10);
      return isNaN(num) ? 0 : num;
    };
    // Normaliza el producto para tener campos consistentes
    const normalized = {
      id: product.id,
      title: product.title || product.titulo || product.nombre || product.name || "Producto",  // Título genérico si no hay
      price: parsePriceString(product.price ?? product.precio ?? product.newPrice ?? 0),  // Precio normalizado
      image: product.image || product.img || product.imagen || "",  // Imagen del producto
    };


    // Actualiza el estado del carrito
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === normalized.id); // Verifica si ya está en el carrito
      if (exists) {
        return prev.map((item) =>  // Incrementa la cantidad si ya existe
          item.id === normalized.id ? { ...item, quantity: item.quantity + 1 } : item  // Incrementa la cantidad si ya existe
        );
      }
      return [...prev, { ...normalized, quantity: 1 }]; // Agrega nuevo item con cantidad 1
    });
  };

  // Elimina un producto del carrito por id
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Actualiza la cantidad de un item en el carrito
  const updateQuantity = (id, quantity) => {
    const q = Number(quantity) || 1;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: q } : item))
    );
  };

  // Calcula el total del carrito
  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 0), 0); // Suma precio * cantidad
  }, [cartItems]);  // cada vez que cartItems cambie, se recalcula el total

  // Vacía el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Provee el contexto a los componentes hijos
  return ( 
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, total, clearCart }}> 
      {children} {/* renderiza los componentes hijos*/}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); // Hook para consumir el contexto del carrito
