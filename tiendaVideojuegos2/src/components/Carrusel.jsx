import React from "react";
import "../css/Carrusel.css";

export default function Carrusel() {
  return (
    // <!-- Carrusel portada deslizante -->


    <div id="portadaCarrusel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">

           {/* <!-- Slide 1 --> */}
        <div className="carousel-item active">
          <a href="#">
            <img
              src="https://4kwallpapers.com/images/wallpapers/the-last-of-us-part-3840x2160-13727.jpg"
              className="d-block w-100"
              alt="Juego destacado 1"
              style={{ objectFit: "cover", maxHeight: "500px" }}
            />
          </a>
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
            <h1>
              ¡Hasta un <span className="text-warning">70% de descuento</span> en los mejores juegos!
            </h1>
            <p>Más de 500 juegos disponibles en nuestro catálogo</p>
          </div>
        </div>

        {/* <!-- Slide 2 --> */}
        <div className="carousel-item">
          <a href="#">
            <img
              src="https://i.blogs.es/763a99/gta6/1366_2000.jpeg"
              className="d-block w-100"
              alt="Juego destacado 2"
              style={{ objectFit: "cover", maxHeight: "500px" }}
            />
          </a>
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
            <h1>Catálogo con <span className="text-warning">+500 juegos</span></h1>
            <p>Los títulos más nuevos al mejor precio</p>
          </div>
        </div>

        {/* <!-- Slide 3 --> */}
        <div className="carousel-item">
          <a href="#">
            <img
              src="/img/juego-de-gato-stray-11554.jpg"
              className="d-block w-100"
              alt="Entrega inmediata"
              style={{ objectFit: "cover", maxHeight: "500px" }}
            />
          </a>
          <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
            <h1><span className="text-warning">Entrega inmediata</span></h1>
            <p>Recibe tu juego al instante después de comprar</p>
          </div>
        </div>
      </div>

      
      {/* /* controles carrousel*/ }
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#portadaCarrusel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#portadaCarrusel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
