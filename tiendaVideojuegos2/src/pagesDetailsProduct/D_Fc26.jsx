import React from 'react';
import CarruselSplide from '../components/CarruselSplide';
import '../css/Fondos.css'
import '../css/CarruselSplide.css'


const images = [
    'https://drop-assets.ea.com/images/38KPvJkmt87CQ4QEDcdsrG/548bb708b526d0981f8eac4dd4c595fa/FC26_Rev_Musiala_Gameplay_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(2560)&q=80',
    'https://drop-assets.ea.com/images/6vOqtTlihMFZMgQWakZNVY/93892e54e4f5fa0c3c10d393a58256de/FC26_Zlatan_Archetype_Lores_Clean_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5572916666666666,yPosition=0.47962962962962963;Resize=(2560)&q=80',
    'https://drop-assets.ea.com/images/3tGdbsLcRXbmbXL5sPvJOt/ce47f4ca25baa40ab2cbe225be51ae7d/FC26_Rev_VVD_FUT_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.4,yPosition=0.3472222222222222;Resize=(2560)&q=80',
    'https://drop-assets.ea.com/images/2KVQq4lSBcPUJct6DEjdic/c06c2dc0e4ffc9a213fd1e8d8a7c2e72/FC26_Rev_Stadium_Clubs_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(2560)&q=80'
];

export default function D_Fc26() {
    return (
        <div className='fondo-Fc26 dark-bg overlay-dark'>
             {/* <!-- Encabezado con imagen --> */}
            <section className="container-fluid p-0">
            <img src="https://drop-assets.ea.com/images/20bYTiyLR8hjpst7WOruQi/c8d8a7ebe79bdb7dde9defb0147a11d7/FC26_Rev_Neuer_Gameplay_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(2560)&q=80" className="img-fluid mx-auto d-block"  style={{ clipPath: 'inset(0 0 20% 0)' }} alt="God of War Ragnarök"/>
            </section>
          

            {/* /*Información producto*/}
              
        <section className="container py-4">
            <div className="row">
                <div className="col-md-8">
                    <h1 className="display-5 text-borde-blanco">Fc26</h1>
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
                    FC 26 te sumerge en la experiencia definitiva del fútbol con gráficos impresionantes, jugabilidad realista y modos de juego innovadores. 
                    Crea tu equipo soñado en el modo Ultimate Team, compite en ligas y torneos, y vive la emoción del fútbol en cada pase, tiro y gol. 
                    Con actualizaciones constantes y eventos en vivo, FC 26 ofrece una experiencia dinámica que mantiene a los jugadores comprometidos durante todo el año.
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
                <h2 className="text-center mb-4 text-borde-blanco">Tráilers y Gameplay Fc26</h2>
                <div className="row g-4">

                    {/* Video 1 */}
                    <div className="col-md-6">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/1ooNXhzMBv4"
                                title="god Of War Ragnarok | Tráiler oficial de presentación"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    {/* Video 2 */}
                    <div className="col-md-6">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src="https://www.youtube.com/embed/EabAJc-2F5k"
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