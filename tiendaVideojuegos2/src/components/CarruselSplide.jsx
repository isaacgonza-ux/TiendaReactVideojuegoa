/*
  Component: CarruselSplide
  Purpose: Reusable horizontal scroller based on Splide.js.
  Props:
    - images: array of image URLs (default: []).
  Behavior: If `images` is empty returns null. Otherwise renders a Splide slider.
  Notes: Options set for non-autoplay, free-drag experience.
*/
/*
  Componente: CarruselSplide
  Propósito: Mostrar un scroller horizontal reutilizable usando Splide.js.
  Props:
    - images: array de URLs de imagen (por defecto: []).
  Comportamiento: si no hay imágenes retorna null; si las hay, renderiza el slider.
  Nota: opciones configuradas para arrastre libre y sin autoplay.
*/
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../css/CarruselSplide.css";

export default function CarruselSplide({ images = [] }) {
  if (!images || images.length === 0) return null;

  return (
    <section aria-label="Beautiful Images" className="splide-wrapper">
      <Splide
        options={{
       
          type: "slide",        // Desplazamiento manual, no loop
          perPage: 3,           // Número de imágenes visibles
          gap: "-1rem",          // Espacio entre imágenes
          arrows: false,        // Quita botones laterales
          pagination: false,    // Quita los dots
          drag: "free",         // Permite scroll libre tipo swipe
          autoplay: false,      // No se mueve solo
          snap: true,           // Ajusta la alineación al final de cada slide
          
        }}
      >
        {images.map((src, index) => (
          <SplideSlide key={index}>
            <img src={src} alt={`slide-${index}`} className="carrusel-img" />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
