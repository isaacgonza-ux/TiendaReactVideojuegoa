import React from "react";
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
import SidebarOffCanvas from "./components/SidebarOffCanvas";
import TitleTypeWriter from "./components/TitleTypeWriter";
import ProductsList from "./components/ProductsList";

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <MenuLateral />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/contacto" element={<Contacto/>}/>  */}
        {/* <Route path="/catalogo" element={<Catalogo />} /> */}
        {/* <Route path="/nosotros" element={<Nosotros />} /> */}
        {/* <Route path="/inicioSesion" element={<InicioSesion />} /> */}
        {/* <Route path="/registroUsuario" element={<RegistroUsuario />} /> */}
        <SidebarOffCanvas />
        <TitleTypeWriter />
        <Descuentos />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
