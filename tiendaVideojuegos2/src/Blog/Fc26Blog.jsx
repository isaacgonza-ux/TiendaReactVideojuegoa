import React from 'react';
import '../css/Fc26Blog.css'; // Asegúrate de que la ruta coincida con tu carpeta

export default function Fc26Blog() {
  // 1. Arreglo de características
  const caracteristicas = [
    {
      id: 1,
      img: "/img/fc1.png",
      alt: "Jugabilidad renovada",
      titulo: "JUGABILIDAD RENOVADA",
      descripcion: "Juega a tu manera con mejoras más exigentes, posibles más inteligentes y de la inteligencia de juego más auténtica hasta la fecha. Los guardianes reaccionan de forma más realista, los regates son más precisos y los tiros más potentes."
    },
    {
      id: 2,
      img: "/img/fc3.png",
      alt: "Modos de juego",
      titulo: "JUEGA A TU MANERA",
      descripcion: "FC 26 introduce dos nuevos preajustes de estilo de juego: competitivo para Ultimate Team y Clubes, y casual para una experiencia más relajada. Cada modo tiene reglas únicas y físicas más realistas."
    },
    {
      id: 3,
      img: "/img/fc2.png",
      alt: "Crea tu futbolista",
      titulo: "CREA TU FUTBOLISTA",
      descripcion: "Los arquetipos te permiten desarrollar tu Carrera como nunca antes. Elige el que se adapte a tu estilo y desbloquea habilidades únicas mientras progresas dentro y fuera del campo."
    },
    {
      id: 4,
      img: "/img/fc4.png",
      alt: "Football Ultimate Team",
      titulo: "DESCUBRE MÁS FORMAS DE COMPETIR EN FOOTBALL ULTIMATE TEAM",
      descripcion: "Compite de formas nuevas en Football Ultimate Team™ con torneos y eventos en vivo, así como con una experiencia renovada de Rivals y Champs. Los torneos pondrán a prueba tus habilidades con hasta cuatro rondas de fútbol de eliminación, mientras que los Eventos en vivo añaden más variedad con competiciones temáticas."
    },
    {
      id: 5,
      img: "/img/fc5.png",
      alt: "Carrera de Mánager",
      titulo: "ACEPTA NUEVOS DESAFÍOS EN CARRERA DE MÁNAGER Y DE FUTBOLISTA",
      descripcion: "Vive la Carrera de Mánager como nunca antes con los nuevos Desafíos en vivo de Mánager a lo largo de la nueva temporada. Enfréntate a una variedad de escenarios del mundo real y líneas narrativas alternativas."
    },
    {
      id: 6,
      img: "/img/fc6.png",
      alt: "Clubes",
      titulo: "FORMA EQUIPO DURANTE TODA LA TEMPORADA EN CLUBES",
      descripcion: "Forma equipo con nuevas grandes incorporaciones a Clubes en EA SPORTS FC™ 26. Experimenta más variedad durante la temporada cuando juegues solo o con colegas del club en eventos en vivo dinámicos."
    }
  ];

  // 2. Arreglo de videos
  const videos = [
    { id: 1, url: "https://www.youtube.com/embed/1ooNXhzMBv4", title: "EA SPORTS FC 26 | Tráiler oficial de presentación" },
    { id: 2, url: "https://www.youtube.com/embed/EabAJc-2F5k", title: "EA SPORTS FC 26 | Official Gameplay Deep Dive" },
    { id: 3, url: "https://www.youtube.com/embed/z7gPHQbyG0U", title: "EA SPORTS FC 26 | Tráiler Lanzamiento 1" },
    { id: 4, url: "https://www.youtube.com/embed/N5sSedHxml8", title: "EA SPORTS FC 26 | Tráiler Lanzamiento 2" }
  ];

  return (
    // Reemplazamos el body por este contenedor principal
    <main className="fondo-fc26">
      
      {/* Portada */}
      <section className="portada-fc26">
        <h1>Bienvenido a EA SPORTS FC™ 26</h1>
      </section>

      {/* Sección intermedia */}
      <section className="seccion-intermedia text-center my-5 px-3 text-white">
        <div className="container">
          <h2 className="mb-3">Descubre las novedades de FC™ 26</h2>
          <p className="lead">
            Explora las mejoras en jugabilidad, los nuevos modos de juego y cómo puedes personalizar tu futbolista 
            como nunca antes. Esta edición está diseñada para ofrecerte una experiencia más auténtica, profunda y divertida.
          </p>
        </div>
      </section>

      {/* Sección de características (Renderizado dinámico) */}
      <div className="container my-5">
        <div className="row g-4 text-center">
          {caracteristicas.map((item) => (
            <div key={item.id} className="col-md-4 feature-card">
              <img src={item.img} alt={item.alt} />
              <h2>{item.titulo}</h2>
              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de videos (Renderizado dinámico) */}
      <section className="container my-5 pb-5">
        <h2 className="text-center mb-4 text-white">Tráilers y Gameplay de FC™ 26</h2>
        <div className="row g-4">
          {videos.map((video) => (
            <div key={video.id} className="col-md-6">
              <div className="ratio ratio-16x9">
                <iframe 
                  src={video.url} 
                  title={video.title} 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}