import React from 'react';
import CarruselSplide from '../components/CarruselSplide';
import '../css/Fondos.css'
import '../css/CarruselSplide.css'


const images = [
    'https://hips.hearstapps.com/hmg-prod/images/god-of-war-ragnarok-11-1667468275.jpg?resize=2048:*',
    'https://easycdn.es/1/imagenes/god-of-war-ragnarok_345907.jpg',
    'https://fotografias-neox.atresmedia.com/clipping/cmsimages01/2021/10/21/F7F6DB85-77C0-4AC6-8E24-4E8718EE76E2/98.jpg?crop=1600,900,x0,y0&width=1900&height=1069&optimize=high&format=webply',
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/11/god-war-ragnarok-2874163.jpg?tf=3840x'
];

export default function D_GowRagnarok() {
    return (
        <div className='fondo-gow-ragnarok dark-bg overlay-dark'>
             {/* <!-- Encabezado con imagen --> */}
            <section className="container-fluid p-0">
            <img src="https://gaming-cdn.com/images/products/16797/screenshot/god-of-war-ragnarok-pc-steam-wallpaper-3.jpg?v=1755004824" className="img-fluid mx-auto d-block"  style={{ clipPath: 'inset(0 0 20% 0)' }} alt="God of War Ragnarök"/>
            </section>
          

            {/* /*Información producto*/}
              
        <section className="container py-4">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="display-5 text-borde-blanco">God of War Ragnarök</h1>
                    <p className="text-borde-blanco">Sony Interactive Entertainment</p>
                    <p className="text-borde-blanco"><strong>Disponible para:</strong> PS5</p>
                    <p className="text-borde-blanco"><strong>Fecha de lanzamiento:</strong> 11/11/2022</p>
                    <p className="text-borde-blanco"><strong>Precio:</strong> US$69.99</p>
                    <p className="text-borde-blanco">Suscríbete a PlayStation Plus para acceder a este juego y cientos más</p>
                        <button className="btn btn-primary">Suscribirse</button>
                </div>
                <div className="col-md-4 text-center">
                <p className="text-borde-blanco"><strong>Modo de juego:</strong></p>
                <ul className="list-group">
                    <li className="list-group-item bg-transparent text-white">🎮 Offline activado</li>
                    <li className="list-group-item bg-transparent text-white">🚫 Online no disponible</li>
                    <li className="list-group-item bg-transparent text-white">🎮 Compatible con vibración y gatillo DualSense</li>
                    <li className="list-group-item bg-transparent text-white">⚡ Mejorado para PS5 Pro</li>
                </ul>
                </div>
            </div>
        </section>
          <CarruselSplide  images={images} />

            {/* Descripción y contenido adicional */}
            <section className="container mb-5">
                <h3 className="mb-3 text-borde-blanco">Descripción</h3>
                <p className="text-borde-blanco">
                    Embárcate en una épica aventura mitológica junto a Kratos y Atreus. Enfrenta
                    criaturas legendarias, explora paisajes helados y descubre el destino de los
                    dioses nórdicos en esta secuela cargada de acción y narrativa profunda.
                </p>

                <h4 className="mt-4 text-borde-blanco">Advertencias de contenido</h4>
                <ul>
                    <li className="text-borde-blanco">🔴 Desmembramiento y sangre</li>
                    <li className="text-borde-blanco">🗣️ Lenguaje fuerte</li>
                    <li className="text-borde-blanco">⚔️ Violencia intensa</li>
                </ul>
            </section>

            {/* Sección de videos */}
            <section className="container my-5">
                <h2 className="text-center mb-4 text-borde-blanco">Tráilers y Gameplay god Of War Ragnarok</h2>
                <div className="row g-4">

                    {/* Video 1 */}
                    <div className="col-md-6">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/F3jePdO9_jc"
                                title="god Of War Ragnarok | Tráiler oficial de presentación"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Video 2 */}
                    <div className="col-md-6">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/vwMJoNggzQE"
                                title="god Of War Ragnarok | La historia en un video"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}