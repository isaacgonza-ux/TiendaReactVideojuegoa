import React from "react";
import { Link } from "react-router-dom";
import "../css/Carrusel.css";

export default function Carrusel() {
  const slides = [
    {
      id: 1,
      img: "https://4kwallpapers.com/images/wallpapers/the-last-of-us-part-3840x2160-13727.jpg",
      alt: "Juego destacado 1",
      title: "¡Hasta un 70% de descuento en los mejores juegos!",
      subtitle: "Más de 500 juegos disponibles en nuestro catálogo",
      link: "/descuentos"
    },
    {
      id: 2,
      img: "https://i.blogs.es/763a99/gta6/1366_2000.jpeg",
      alt: "Juego destacado 2",
      title: "Catálogo con +500 juegos",
      subtitle: "Los títulos más nuevos al mejor precio",
      link: "/catalogo"
    },
    {
      id: 3,
      img: "/img/juego-de-gato-stray-11554.jpg",
      alt: "Entrega inmediata",
      title: "Entrega inmediata",
      subtitle: "Recibe tu juego al instante después de comprar",
      link: "/catalogo"
    }
  ];

  return (
    <div
      id="portadaCarrusel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="2000" // cambia de slide cada 2 segundos
    >
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <Link to={slide.link}>
              <img
                src={slide.img}
                className="d-block w-100"
                alt={slide.alt}
                style={{ objectFit: "cover", maxHeight: "500px" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h1 className="text-warning">{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

