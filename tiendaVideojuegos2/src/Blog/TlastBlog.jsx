import React from 'react';
import '../css/BlogStyle.css';


export default function Tlast1Blog() {
  // 1. Separamos los datos de las tarjetas en un arreglo
  const caracteristicas = [
    {
      id: 1,
      img: "https://phantom-elmundo.unidadeditorial.es/750a7a001c1e694e3dba2cad1cbc53dc/crop/131x5/2716x1728/resize/1200/f/jpg/assets/multimedia/imagenes/2022/09/02/16621137984042.jpg",
      alt: "Gráficos mejorados",
      titulo: "GRÁFICOS DE NUEVA GENERACIÓN",
      descripcion: "Es un remake del juego original The Last of Us de 2013, adaptado a la tecnología más reciente."
    },
    {
      id: 2,
      img: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-05-en-17may22?$1600px$",
      alt: "Historia emocional",
      titulo: "UNA HISTORIA EMOCIONAL",
      descripcion: "Se enfoca en la historia de Joel y Ellie, quienes deben cruzar una América posapocalíptica devastada por la infección del hongo Cordyceps, luchando contra infectados y facciones humanas despiadadas."
    },
    {
      id: 3,
      img: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-11-en-17may22?$1600px$",
      alt: "Jugabilidad inmersiva",
      titulo: "JUGABILIDAD INMERSIVA Y DESAFIANTE",
      descripcion: "Cuenta con inteligencia artificial (IA) de enemigos más agresiva y táctica, y una jugabilidad de combate y exploración mejorada."
    },
    {
      id: 4,
      img: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-03-en-17may22?$1600px$",
      alt: "Experiencia inmersiva",
      titulo: "Experiencia inmersiva",
      descripcion: "El 3D audio y las funciones del DualSense crean una experiencia más inmersiva y emocional, permitiendo a los jugadores sentir el juego."
    },
    {
      id: 5,
      img: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-06-en-17may22?$1600px$",
      alt: "Narrativa profunda",
      titulo: "Narrativa profunda",
      descripcion: "Su misión se convierte en un brutal viaje por todo el país, donde se dan cuenta de que Ellie podría ser la clave para una cura."
    },
    {
      id: 6,
      img: "https://gmedia.playstation.com/is/image/SIEPDC/the-last-of-us-part-i-screenshot-02-en-17may22?$1600px$",
      alt: "Arquetipos",
      titulo: "Contenido adicional",
      descripcion: "La remasterización incluye la aclamada precuela Left Behind, que explora el pasado de Ellie y su mejor amiga Riley."
    }
  ];

  // 2. Separamos los videos
  const videos = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/R2Ebc_OFeug",
      titulo: "The Last Of Us Part l | Tráiler oficial de presentación"
    },
    {
      id: 2,
      url: "https://www.youtube.com/embed/CxVyuE2Nn_w",
      titulo: "The Last Of Us Part l | Tráiler oficial de presentación pc"
    }
  ];

  return (
    <main className='tlasfondo-blog'>
      {/* Portada */}
      <section className="portada-tl1"></section>

      {/* Sección intermedia */}
      <section className="seccion-intermedia text-center my-5 px-3 text-white">
        <div className="container">
          <h2 className="mb-3">Un juego tan cruel como hermoso</h2>
          <p className="lead">
            Conoce la emocionante historia y a los entrañables personajes de The Last of Us, 
            ganador de más de 200 premios del Juego del año.
          </p>
        </div>
      </section>

      {/* Sección de características (Renderizado dinámico) */}
      <div className="container my-5">
        <div className="row g-4">
          {caracteristicas.map((item) => (
            <div key={item.id} className="col-md-4 feature-card">
              {/* Nota el cierre de la etiqueta img */}
              <img src={item.img} alt={item.alt} /> 
              <h2>{item.titulo}</h2>
              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de videos (Renderizado dinámico) */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Tráilers y Gameplay The last of us part l</h2>
        <div className="row g-4">
          {videos.map((video) => (
            <div key={video.id} className="col-md-6">
              <div className="ratio ratio-16x9">
                {/* Nota el uso de allowFullScreen con F mayúscula */}
                <iframe 
                  src={video.url} 
                  title={video.titulo} 
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