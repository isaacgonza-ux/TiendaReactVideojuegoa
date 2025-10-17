
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
import InicioSesion from "./pages/InicioSesion.jsx";
import RegistroUsuario from "./pages/RegistroUsuario.jsx"; 
// import Descuentos from "./pages/Descuentos.jsx"; 
import AdminProd from "./pages/AdminProd.jsx";


function App() {
   const [isAdminLogged, setIsAdminLogged] = useState(false); 
  return (
    <BrowserRouter>
      <Menu />
      <MenuLateral />

      <Routes>

        <Route path="/" element={<Home />} />
          <Route path="/gow-ragnarok" element={<D_GowRagnarok/>} />
        <Route path="/contacto" element={<Contacto/>}/> 
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/inicioSesion" element={<InicioSesion setIsAdminLogged={setIsAdminLogged} />} />
        <Route path="/registrousuario" element={<RegistroUsuario />} />
        <Route path= "/admin" element={isAdminLogged ? <AdminProd /> : <InicioSesion setIsAdminLogged={setIsAdminLogged} />}/>
        {/* <Route path="/descuentos" element={<Descuentos />} /> */}

        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
