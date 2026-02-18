import React from "react";
import GameBlog from "../components/Noticias/Blog"
import { battlefieldData } from"../data/BlogData"; 


export default function Battlefield() {
    // Simplemente pasamos todos los datos usando el spread operator (...)
    return <GameBlog {...battlefieldData} />;
}