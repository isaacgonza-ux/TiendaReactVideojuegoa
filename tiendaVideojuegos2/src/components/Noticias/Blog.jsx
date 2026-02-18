import React from "react";
// Puedes mantener un CSS base o pasar clases personalizadas
import "../../css/Blog.css";

export default function GameBlog({ 
 backgroundImage, // URL del fondo general
  coverImage,      // URL de la imagen de portada
  title,           // Título principal
  description,     // Descripción de la intro
  features,        // Array de objetos con las características
  videos           // Array de objetos con los videos
}) 

    {
  // Creamos un objeto de estilo con las variables
  const containerStyle = {
    "--bg-image": `url(${backgroundImage})`,
    "--cover-image": `url(${coverImage})`
  };
  return (
    <div className="game-blog" style={containerStyle}>
      <main>
        {/* Portada (El fondo lo maneja el CSS de 'heroClass') */}
        <section className="portada" style={{minHeight: '60vh'}}></section>

        {/* Sección intermedia */}
        <section className="seccion-intermedia text-center my-5 px-3 text-white">
          <div className="container">
            <h2 className="mb-3">{title}</h2>
            <p className="lead">{description}</p>
          </div>
        </section>

        {/* Sección de características (Grid Dinámico) */}
        <div className="container my-5">
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4 feature-card">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="img-fluid mb-3" // Agregué mb-3 para separación
                />
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de videos (Grid Dinámico) */}
        <section className="container my-5 pb-5">
          <h2 className="text-center mb-4 text-white">Tráilers y Gameplay</h2>
          <div className="row g-4">
            {videos.map((video, index) => (
              <div key={index} className="col-md-6">
                <div className="ratio ratio-16x9 shadow-lg">
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
    </div>
  );
}