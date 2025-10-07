import React from "react";
import Carrusel from "../components/Carrusel";
import ProductCard from "../components/ProductCard";
import { estrenos } from "../data/ProductData";
import { ofertas } from "../data/ProductData";
import { masVendidos } from "../data/ProductData";
import NewsSection from "../components/NewsSection";

function Home(){
    return(
        
        <main>
            <Carrusel/>
             {/* Sección Estrenos */}
            <section className="container my-5">
                <h2 className="text-center text-warning mb-4">Estrenos</h2>
                <div className="row g-4">
                {estrenos.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            </section>

                    {/* Ofertas */}
            <section className="container my-5">
                <h2 className="text-center text-warning mb-4">🔥Ofertas🔥</h2>
                <div className="row g-4">
                {ofertas.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            </section>

             {/* Más vendidos */}
            <section className="container my-5">
                <h2 className="text-center text-warning mb-4">Más vendidos</h2>
                <div className="row g-4">
                {masVendidos.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            </section>
            
            
            {/* Noticias */}
            <NewsSection/>



        </main>
        
    );
}

export default Home;