import React from "react";
import Menu from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import MenuLateral from "./components/MenuLateral.jsx";

function App() {
  return (
    <>
      <Menu/>
      <MenuLateral/>
      <Home/>
      <Footer/>
     
    </>
  );
}

export default App;
