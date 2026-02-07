import React from 'react';
import CarruselSplide from '../components/CarruselSplide';
import '../css/Fondos.css'; 
import '../css/CarruselSplide.css';

export default function ProductDetail({ 
    title, 
    publisher, 
    platform, 
    releaseDate, 
    price, 
    mainImage, 
    // Esta prop recibirá el nombre de la clase del CSS (ej: "fondo-DeathStranding2")
    backgroundClass, 
    carouselImages, 
    description, 
    features = [], 
    warnings = [], 
    videos = []    
}) {
    return (
        /* Aquí concatenamos las clases:
           1. backgroundClass: trae la imagen de fondo específica desde tu CSS.
           2. dark-bg y overlay-dark: traen tus estilos generales de oscuridad y superposición.
        */
        <div className={`${backgroundClass} dark-bg overlay-dark`}>
            
            {/* Encabezado con imagen principal */}
            <section className="container-fluid p-0">
                <img 
                    src={mainImage} 
                    className="img-fluid mx-auto d-block" 
                    style={{ clipPath: 'inset(0 0 20% 0)' }} 
                    alt={title}
                />
            </section>

            {/* Información del producto */}
            <section className="container py-4">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="display-5 text-borde-blanco">{title}</h1>
                        <p className="text-borde-blanco">{publisher}</p>
                        <p className="text-borde-blanco"><strong>Disponible para:</strong> {platform}</p>
                        <p className="text-borde-blanco"><strong>Fecha de lanzamiento:</strong> {releaseDate}</p>
                        <p className="text-borde-blanco"><strong>Precio:</strong> {price}</p>
                        <p className="text-borde-blanco">Suscríbete a PlayStation Plus para acceder a este juego y cientos más</p>
                        <button className="btn btn-primary">Comprar</button>
                    </div>
                    
                    <div className="col-md-4 text-center">
                        <p className="text-borde-blanco"><strong>Modo de juego:</strong></p>
                        <ul className="list-group">
                            {features.map((feature, index) => (
                                <li key={index} className="list-group-item bg-transparent text-white">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Carrusel */}
            {carouselImages && <CarruselSplide images={carouselImages} />}

            {/* Descripción */}
            <section className="container mb-5">
                <h3 className="mb-3 text-borde-blanco">Descripción</h3>
                <p className="text-borde-blanco">{description}</p>

                {warnings.length > 0 && (
                    <>
                        <h4 className="mt-4 text-borde-blanco">Advertencias de contenido</h4>
                        <ul>
                            {warnings.map((warn, index) => (
                                <li key={index} className="text-borde-blanco">{warn}</li>
                            ))}
                        </ul>
                    </>
                )}
            </section>

            {/* Videos */}
            {videos.length > 0 && (
                <section className="container my-5">
                    <h2 className="text-center mb-4 text-borde-blanco">Tráilers y Gameplay</h2>
                    <div className="row g-4">
                        {videos.map((video, index) => (
                            <div key={index} className="col-md-6">
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
            )}
        </div>
    );
}