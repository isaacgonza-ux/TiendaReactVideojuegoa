import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Menu from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import MenuLateral from "./components/MenuLateral.jsx";
import Contacto from "./pages/Contacto.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import D_GowRagnarok from './pagesDetailsProduct/D_GowRagnarok.jsx';
import D_DeathStranding2 from './pagesDetailsProduct/D_DeathStranding2.jsx';
import InicioSesion from "./pages/InicioSesion.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx"; 
import Descuentos from "./pages/Descuentos.jsx"; 
import AdminProd from "./pages/AdminProd.jsx";
import AdminUser from "./pages/AdminUser.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import { CartProvider } from './components/CartContext';
import { CartDrawer } from './components/CartDrawer';
import Pago from "./pages/Pago.jsx";
import PagoError from "./pages/PagoError.jsx";
import PagoExitoso from "./pages/PagoExitoso.jsx";



function App() {
   const [isAdminLogged, setIsAdminLogged] = useState(false); 
  const [isCartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!isCartOpen);

  return (
    <CartProvider>
    <BrowserRouter>
  <Menu toggleCart={toggleCart} />
  <MenuLateral />

      <Routes>


         <Route path="/" element={<Home />} /> *
            <Route path="/gow-ragnarok" element={<D_GowRagnarok/>} /> 
            <Route path="/deathstranding2" element={<D_DeathStranding2/>} /> 
         <Route path="/contacto" element={<Contacto/>}/>  
         <Route path="/catalogo" element={<Catalogo />} /> 
        {/* <Route path="/nosotros" element={<Nosotros />} /> */}
        {/* <Route path="/inicioSesion" element={<InicioSesion setIsAdminLogged={setIsAdminLogged} />} /> */}
        {/* <Route path="/registrousuario" element={<RegistroUsuario />} /> */}
        <Route path="/pago" element={<Pago />} />
        <Route path="/pagoExito" element={<PagoExitoso />} />
        <Route path="/pagoError" element={<PagoError />} />
        
          <Route path="/descuentos" element={<Descuentos />} />  

           {/* Rutas protegidas */}
         {/* <Route path="/admin/*" element={isAdminLogged ? ( <AdminPanel />) : (<Navigate to="/inicioSesion" replace />)}/> */}

        {/* Redirección por defecto en caso de error 404*/}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}


        
      </Routes>

    

      <CartDrawer isOpen={isCartOpen} toggleCart={toggleCart} />
      <Footer />
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
