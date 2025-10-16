// ...existing code...
import Typewriter from "typewriter-effect";
import { FaShoppingCart } from "react-icons/fa";

const TitleTypeWriter = () => {
  const typewriterOptions = {
    strings: [" ✋ Hola, soy Urian Viera", "Full Stack Developer 🔥"],
    autoStart: true,
    loop: true,
    deleteSpeed: 50,
    delay: 75,
  };

  return (
    <section className="row align-items-center">
      <div className="col-12 col-md-7">
        <h1 className="display-5 titulo">
          Bienvenido a mi <span style={{ color: "#ff9c08" }}> tienda online</span> 🛍️
        </h1>
        <h3 className="text-center" aria-live="polite" role="status">
          <Typewriter options={typewriterOptions} />
        </h3>
      </div>
      <div className="col-12 col-md-5 text-center">
        <div className="icon-wrapper px-3" aria-hidden="true">
          <FaShoppingCart size={160} color="#ff9c08" />
        </div>
      </div>
    </section>
  );
};

export default TitleTypeWriter;
// ...existing code...