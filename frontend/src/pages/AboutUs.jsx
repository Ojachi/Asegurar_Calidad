import React from "react";
import carru1 from "../assets/images/carru1.jpg";
import carru2 from "../assets/images/carru2.jfif";
import carru3 from "../assets/images/carru3.jpg";
import vision from "../assets/images/vision.jfif";

const AboutUs = () => {
  return (
    <>
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="text-primary">Nuestra Misión</h2>
            <p>
              Nuestra misión es proporcionar herramientas y soluciones
              innovadoras para la evaluación de la calidad de software, ayudando
              a nuestros clientes a optimizar sus procesos de desarrollo,
              mejorar la eficiencia y reducir riesgos. Nos esforzamos por
              garantizar que cada proyecto de software alcance los más altos
              estándares de calidad y confiabilidad, contribuyendo al éxito y la
              sostenibilidad de sus negocios.
            </p>
          </div>

          <div className="col-md-6">
            <div
              id="carouselMision"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={carru1}
                    className="d-block w-100 rounded"
                    alt="Ejemplo de calidad de software"
                    loading="lazy"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={carru2}
                    className="d-block w-100 rounded"
                    alt="Optimización de procesos"
                    loading="lazy"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src={carru3}
                    className="d-block w-100 rounded"
                    alt="Gestión de riesgos en software"
                    loading="lazy"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselMision"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselMision"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src={vision}
              alt="Visión de QualiCheck"
              className="rounded-custom w-100"
              loading="lazy"
            />
          </div>

          <div className="col-md-6">
            <h2 className="text-primary fw-bold">Nuestra Visión</h2>
            <p>
              Ser la plataforma líder en evaluación de calidad de software,
              reconocida por nuestra excelencia en el análisis de estándares
              internacionales y la gestión de riesgos. Aspiramos a convertirnos
              en el socio estratégico de empresas tecnológicas en todo el mundo,
              apoyando su crecimiento mediante la mejora continua de la calidad
              de sus productos digitales.
            </p>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-primary">Contáctanos</h2>
            <p>
              <i className="fas fa-map-marker-alt"></i> Dirección: Calle Ejemplo
              123, Ciudad, País
            </p>
            <p>
              <i className="fas fa-phone"></i> Teléfono: +123 456 7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> Correo:
              contacto@qualicheck.com
            </p>
          </div>

          <div className="col-md-6 text-center">
            <h3 className="text-primary">Síguenos en Redes Sociales</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="me-3">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com" className="me-3">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://instagram.com" className="me-3">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://linkedin.com" className="me-3">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h3 className="text-primary text-center mb-4">Nuestra Ubicación</h3>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <iframe
              title="Google Maps"
              style={{ height: "400px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5635.015432742314!2d-75.29900217791895!3d2.942594331016226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b74f438bb0299%3A0x3d63073da14eebf7!2sUniversidad%20Surcolombiana%20-%20Sede%20Central!5e0!3m2!1ses!2sco!4v1731724828315!5m2!1ses!2sco"
              width="100%"
              height="400"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
