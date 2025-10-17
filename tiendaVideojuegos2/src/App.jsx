import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import MenuLateral from "./components/MenuLateral.jsx";
import Contacto from "./pages/Contacto.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import InicioSesion from "./pages/InicioSesion.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx"; 
import Descuentos from "./pages/Descuentos.jsx"; 
import { CartProvider } from './components/CartContext';
import { CartDrawer } from './components/CartDrawer';




function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!isCartOpen);
  return (
    <CartProvider>
    <BrowserRouter>
      <Menu />
      <MenuLateral />
       <button onClick={toggleCart}>🛒 Ver Carrito</button>

      <Routes>
         <Route path="/" element={<Home />} /> 
        {/* <Route path="/contacto" element={<Contacto/>}/>  */}
         <Route path="/catalogo" element={<Catalogo />} /> 
        {/* <Route path="/nosotros" element={<Nosotros />} /> */}
        {/* <Route path="/inicioSesion" element={<InicioSesion />} /> */}
        {/* <Route path="/registroUsuario" element={<RegistroUsuario />} /> */}
        <Route path="/descuentos" element={<Descuentos />} />
        </Routes>

      <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />
      <Footer />
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
