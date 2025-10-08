import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Menu from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import MenuLateral from "./components/MenuLateral.jsx";
import Contacto from "./pages/Contacto.jsx";
import Catalogo from "./pages/Catalogo.jsx";

function App() {
  return (
    
    <BrowserRouter>
      {/* <Menu/> */}
      {/* <MenuLateral/> */}
      <Catalogo/>
     
      
      {/* <Routes> */}
        {/* <Route path="/" element ={<Home/>}/> */}
        {/* <Route path="/Contacto" element={<Contacto/>}/> */}
        
        {/* <Footer/> */}
      {/* </Routes> */}
     
    </BrowserRouter>
  );
}

export default App;
