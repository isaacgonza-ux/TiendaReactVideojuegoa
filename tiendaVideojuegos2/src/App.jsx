import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";

// Componentes Generales
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import MenuLateral from "./components/MenuLateral.jsx";
import { CartProvider } from './components/CartContext';
import { CartDrawer } from './components/CartDrawer';

// Páginas Generales
import Home from "./pages/Home.jsx";
import Contacto from "./pages/Contacto.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Descuentos from "./pages/Descuentos.jsx"; 
import B_Battlefield from "./Blog/B_Battlefield.jsx";
import Tlast1Blog from "./Blog/TlastBlog.jsx";

// Autenticación y Admin
import InicioSesion from "./pages/InicioSesion.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx"; 
import AdminPanel from "./pages/AdminPanel.jsx";
// (Si no usas AdminProd, AdminUser, AdminOrders directamente aquí porque están dentro de AdminPanel, puedes quitarlos, si no, déjalos)

// Pagos
import Checkout from './pages/Checkout.jsx';
import Pago from "./pages/Pago.jsx";
import PagoError from "./pages/PagoError.jsx";
import PagoExitoso from "./pages/PagoExitoso.jsx";

// --- IMPORTACIÓN DEL COMPONENTE REUTILIZABLE ---
import ProductDetail from './components/ProductDetail'; // Ajusta la ruta si es necesario

// --- IMPORTACIÓN DE DATOS DE JUEGOS ---
import { 
  deathStrandingData, 
 fc26Data,
 gtaVlData,
 gowRagnarokData,
 tlas1Data,
 tlas2Data,
 redDeadRedemption2Data,
 gow2018Data
} from './data/ProductData'; // Ajusta la ruta si es necesario


function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const toggleCart = () => setCartOpen(!isCartOpen);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'ADMIN') {
      setIsAdminLogged(true);
    }
  }, []);

  // Componente interno que usa los hooks de router correctamente
  const AppLayout = () => {
    const location = useLocation();
    const prevPathRef = useRef(null);
    
    // Cierra el carrito solo cuando la ruta realmente cambia
    useEffect(() => {
      if (prevPathRef.current !== null && prevPathRef.current !== location.pathname) {
        setCartOpen(false);
      }
      prevPathRef.current = location.pathname;
    }, [location.pathname]);

    return (
      <>
        <ScrollToTop />
        <Menu toggleCart={toggleCart} />
        <MenuLateral />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* --- RUTAS DE PRODUCTOS REUTILIZABLES --- */}
          {/* Usamos el spread operator (...) para pasar todas las propiedades del objeto como props */}
          <Route path="/gow-ragnarok" element={<ProductDetail {...gowRagnarokData} />} /> 
          <Route path="/deathstranding2" element={<ProductDetail {...deathStrandingData} />} /> 
          <Route path="/fc26" element={<ProductDetail {...fc26Data} />} />
          <Route path="/gta-vl" element={<ProductDetail {...gtaVlData} />} />
          <Route path="/tlas1" element={<ProductDetail {...tlas1Data} />} />
          <Route path="/red-dead-2" element={<ProductDetail {...redDeadRedemption2Data} />} />
          <Route path="/god-of-war-2018" element={<ProductDetail {...gow2018Data} />} />
          <Route path="/tlas2" element={<ProductDetail {...tlas2Data} />} />



          {/* Rutas Generales */}
          <Route path="/contacto" element={<Contacto/>}/>  
          <Route path="/catalogo" element={<Catalogo />} /> 
          <Route path="/nosotros" element={<Nosotros />} /> 
          <Route path="/descuentos" element={<Descuentos />} />  

          {/* Autenticación */}
          <Route path="/inicioSesion" element={<InicioSesion setIsAdminLogged={setIsAdminLogged} />} /> 
          <Route path="/registrousuario" element={<RegistroUsuario />} /> 

          {/* Proceso de Pago */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/pagoExito" element={<PagoExitoso />} />
          <Route path="/pagoError" element={<PagoError />} />

          {/* Blog (Ejemplo) */}
       
          <Route path="/blog/battlefield" element={<B_Battlefield />} />
          <Route path="/blog/tlast1" element={<Tlast1Blog />} />

      

          {/* Rutas protegidas - Verifica el estado isAdminLogged */}
          <Route 
            path="/admin/*" 
            element={isAdminLogged ? <AdminPanel isAdminLogged={isAdminLogged} /> : <Navigate to="/inicioSesion" replace />}
          /> 
          
          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>

        <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />
        <Footer />
      </>
    );
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;