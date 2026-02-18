/*
    Página detalle: D_DeathStranding2
    Propósito: Página de producto detallada para "Death Stranding 2".
    Contenido: encabezado con imagen, información del producto, carrusel, descripción y vídeos.
    Nota: componente presentacional, no requiere props.
*/
import React from 'react';
import CarruselSplide from '../components/CarruselSplide';
import '../css/Fondos.css';
import '../css/CarruselSplide.css';




const images = [
    'https://cdn.mos.cms.futurecdn.net/FN8BJYqowTe423mb3nZDzb.jpg',
    'https://www.kojimaproductions.jp/sites/default/files/2025-03/ds2_sxsw2025_screenshots009.jpg',
    'https://images2.alphacoders.com/135/thumb-1920-1350293.jpeg',
    'https://gaming-cdn.com/images/products/13292/screenshot/death-stranding-2-on-the-beach-pc-steam-wallpaper-1.jpg?v=1750685513'
];

export default function D_DeathStranding2() {
    return (
        <div className='fondo-DeathStranding2 dark-bg overlay-dark'>
             {/* <!-- Encabezado con imagen --> */}
            <section className="container-fluid p-0">
          <img src="https://www.kojimaproductions.jp/sites/default/files/2024-02/ds2_sop2024_screenshot013.jpg" className="img-fluid mx-auto d-block"  style={{ clipPath: 'inset(0 0 20% 0)' }} alt="Death Stranding 2"/>
            </section>
          

            {/* /*Información producto*/}
              
        <section className="container py-4">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="display-5 text-borde-blanco">Death Stranding 2</h1>
                    <p className="text-borde-blanco">Sony Interactive Entertainment</p>
                    <p className="text-borde-blanco"><strong>Disponible para:</strong> PS5</p>
                    <p className="text-borde-blanco"><strong>Fecha de lanzamiento:</strong> 11/11/2022</p>
                    <p className="text-borde-blanco"><strong>Precio:</strong> US$69.99</p>
                    <p className="text-borde-blanco">Suscríbete a PlayStation Plus para acceder a este juego y cientos más</p>
                        <button className="btn btn-primary">Comprar</button>
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
                    Death Stranding 2: On the Beach La esperada secuela del innovador juego de Hideo Kojima. Acompaña nuevamente
                    a Sam Porter Bridges en una aventura misteriosa y desafiante, donde la conexión entre los vivos y los muertos es clave para la 
                    supervivencia. Explora paisajes inquietantes, enfréntate a nuevas amenazas y descubre una historia profunda y cinematográfica 
                    que redefine el género.
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
                <h2 className="text-center mb-4 text-borde-blanco">Tráilers y Gameplay Death Stranding</h2>
                <div className="row g-4">

                    {/* Video 1 */}
                    <div className="col-md-6">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/etOOO9Sq7u8"
                                title="Death Stranding 2| Tráiler oficial de presentación"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Video 2 */}
                    <div className="col-md-6">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/MT5m5NKtq-Q"
                                title="Death Stranding | La historia en un video"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}