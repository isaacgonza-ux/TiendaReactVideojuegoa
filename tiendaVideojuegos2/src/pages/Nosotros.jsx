/*
    Página: Nosotros
    Propósito: Mostrar información de la empresa, equipo y valores.
    Contenido: secciones estáticas (hero, quiénes somos, equipo, valores, contacto).
    Entrada: ninguna; componente presentacional.
*/
import React from "react";
import '../index.css';
import { Link } from "react-router-dom";

function Nosotros() {
    return (
        <div>

            {/* Hero Section */}
            <header className="bg-dark text-white text-center py-5">
                <div style={{ backgroundImage: "url('/img/tienda.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="container">
                        <h1 className="display-4 fw-bold text-bordered">Sobre Nosotros</h1>
                        <p className="lead text-bordered">Pasión por los videojuegos, compromiso con nuestros jugadores</p>
                    </div>
                </div>
            </header>

    {/* <!-- Quiénes Somos --> */}
    <section className="py-5 bg-light">
        <div className="container">
        <h2 className="mb-4">¿Quiénes somos?</h2>
        <p>Somos una tienda digital especializada en videojuegos para todas las plataformas. Nacimos del amor por los mundos virtuales y la comunidad gamer. Nuestro objetivo es ofrecer los mejores títulos, precios competitivos y una experiencia de compra confiable y emocionante.</p>
        </div>
    </section>

    {/* <!-- Nuestro Equipo --> */}
    <section className="py-5">
        <div className="container">
        <h2 className="mb-4">Nuestro equipo</h2>
        <div className="row">
            <div className="col-md-4 text-center">
                <img src="https://www.ecartelera.com/images/noticias/72100/72193-h3.jpg" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '300px' }} alt="Isaac" />
                <h5>Isaac</h5>
                <p>Fundador & Backend Developer</p>
            </div>
            <div className="col-md-4 text-center">
                <img src="https://fotos.perfil.com/2022/08/19/trim/1280/720/yo-soy-groot-1405138.jpeg" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '300px' }} alt="Almendra" />
                <h5>Almendra</h5>
                <p>Fundadora & Frontend Developer</p>
            </div>
            <div className="col-md-4 text-center">
                <img src="https://gaming-cdn.com/images/news/articles/13222/cover/1000x563/el-actor-de-arthur-morgan-tambien-parece-dejar-caer-que-habra-un-anuncio-sobre-red-dead-esta-semana-cover685132864105e.jpg" className="img-fluid rounded-circle" style={{ maxWidth: '300px' }} alt="Arthur" />
                <h5>Canela</h5>
                <p>Especialista en atención al cliente</p>
            </div>
        </div>
        </div>
    </section>

    {/* <!-- Nuestros Valores --> */}
    <section className="py-5 bg-light">
        <div className="container">
        <h2 className="mb-4">Nuestros valores</h2>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">🎯 Compromiso con la calidad</li>
            <li className="list-group-item">🤝 Atención personalizada</li>
            <li className="list-group-item">🚀 Innovación constante</li>
            <li className="list-group-item">🎮 Amor por los videojuegos</li>
        </ul>
        </div>
    </section>

    {/* <!-- Contacto --> */}
    <section className="py-5 text-center">
        <div className="container">
        <h2 className="mb-4">¿Quieres saber más?</h2>
        <Link to ="/contacto" className="btn btn-primary btn-lg">Contáctanos</Link>
        </div>
    </section>
   </div>
    );
};

export default Nosotros;