import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import MenuLateral from "./components/MenuLateral.jsx";
import Contacto from "./pages/Contacto.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import D_GowRagnarok from './pagesDetailsProduct/D_GowRagnarok.jsx';


function App() {
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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
