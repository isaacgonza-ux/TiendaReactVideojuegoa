/*
  Página/Blog: B_Battlefield
  Propósito: Entrada de blog que presenta características y videos de Battlefield 6.
  Contenido: secciones estáticas, tarjetas de características y vídeos embebidos.
  Nota: componente presentacional, usa estilos en ../Css/Battlefield.css.
*/
import React from "react";
import "../css/Battlefield.css";
import { blogBattlefield } from "../data/Blog_Btf";

export default function Battlefield() {
  return (
    <div className="battlefield-blog">
    <main>
      {/* Portada */}
      <section className="portada"></section>

      {/* Sección intermedia */}
      <section className="seccion-intermedia text-center my-5 px-3 text-white">
        <div className="container">
          <h2 className="mb-3">Para los amantes de los disparos</h2>
          <p className="lead">
            Un videojuego de disparos en primera persona ambientado en la
            actualidad, que devuelve la experiencia de guerra total
            característica de la saga con un enfoque en la destrucción del
            entorno y combates intensos de infantería y vehículos.
          </p>
        </div>
      </section>

      {/* Sección de características */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Tarjeta 1 */}
          <div className="col-md-4 feature-card">
            <img
              src="blog/b2.png"
              alt="Gráficos mejorados"
              className="img-fluid"
            />
            <h2>GUERRA TOTAL</h2>
            <p>
              La experiencia central de Battlefield, con la mezcla de combate de
              infantería, vehículos y destrucción de entornos que permite una
              ventaja táctica.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="col-md-4 feature-card">
            <img
              src="blog/b1.png"
              alt="Historia emocional"
              className="img-fluid"
            />
            <h2>DESTRUCCIÓN TÁCTICA</h2>
            <p>
              La capacidad de transformar los escenarios para obtener una
              ventaja estratégica es más reactiva y consistente que nunca.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="col-md-4 feature-card">
            <img
              src="blog/b3.png"
              alt="Jugabilidad inmersiva"
              className="img-fluid"
            />
            <h2>CAMPAÑA GLOBAL</h2>
            <p>
              Una campaña individual que te lleva a través de combates en
              diferentes partes del mundo, como Gibraltar, Nueva York y el
              Sahara.
            </p>
          </div>

          {/* Tarjeta 4 */}
          <div className="col-md-4 feature-card">
            <img
              src="blog/b3.png"
              alt="Experiencia inmersiva"
              className="img-fluid"
            />
            <h2>CLASES TRADICIONALES</h2>
            <p>
              Vuelve a las clases tradicionales de Battlefield con roles
              definidos: Asalto, Ingeniero, Apoyo y Reconocimiento.
            </p>
          </div>

          {/* Tarjeta 5 */}
          <div className="col-md-4 feature-card">
            <img
              src="blog/b4.png"
              alt="Narrativa profunda"
              className="img-fluid"
            />
            <h2>BATTLEFIELD PORTAL</h2>
            <p>
              Una herramienta creativa que permite a los jugadores crear y
              compartir sus propias experiencias de juego, alterando reglas,
              mapas y armas.
            </p>
          </div>

          {/* Tarjeta 6 */}
          <div className="col-md-4 feature-card">
            <img
              src="blog/b5.png"
              alt="Arquetipos"
              className="img-fluid"
            />
            <h2>AMBIENTACIÓN MODERNA</h2>
            <p>
              A diferencia de su predecesor, el juego se desarrolla en un
              contexto contemporáneo, regresando a un escenario más familiar.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de videos */}
      <section className="container my-5">
        <h2 className="text-center mb-4">
          Tráilers y Gameplay Battlefield 6
        </h2>
        <div className="row g-4">
          {/* Video 1 */}
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/pgNCgJG0vnY"
                title="Tráiler oficial de presentación"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Video 2 */}
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/wFGEMfyAQtI"
                title="Tráiler oficial de presentación PC"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
    </div>
  );
}
