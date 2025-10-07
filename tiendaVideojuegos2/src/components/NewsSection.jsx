import React from "react";
import { noticias } from "../data/NewsData";
import "../css/NewsSection.css";


export default function NewsSection() {
  return (
    <section className="container my-5">
      <h2 className="text-center text-warning mb-4">Noticias</h2>
      <div className="row g-4">
        {noticias.map((news) => (
          <div key={news.id} className="col-md-4">
            <div className="news-card position-relative">
              <img src={news.img} alt={news.title} className="img-fluid" />
              <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center p-3" style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>
                <h5>{news.title}</h5>
                <a href={news.link} className="btn btn-warning mt-2">Ver Más</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
