import React from "react";
import img1 from "../assets/images/img1.png";
import icono_matriz from "../assets/images/icono_matriz.png";
import icono_informe from "../assets/images/icono_informes.png";
import icono_calidad from "../assets/images/icono_calidad.png";

const Home = () => {
  return (
    <div>
      <div class="bg-primary text-white text-center py-5">
        <div class="container">
          <h1>Evaluación de Calidad de Software a tu Alcance</h1>
          <p class="lead">
            Optimiza tu desarrollo con estándares de calidad reconocidos.
          </p>
        </div>
      </div>

      <div>
        <main class="container my-5">
          <section id="presentacion" class="presentacion">
            <h2>¿Por qué Evaluar la Calidad del Software?</h2>
            <div class="content">
              <img src={img1} alt="Evaluación de Software" class="imagen" />
              <p>
                Evaluar la calidad del software es crucial para garantizar que
                cumple con los estándares de eficiencia, seguridad y
                satisfacción del usuario. Una evaluación rigurosa permite
                identificar áreas de mejora, minimizar riesgos y asegurar que el
                producto final no solo funcione correctamente, sino que también
                ofrezca una experiencia confiable y optimizada para el cliente.
                Invertir en la calidad es invertir en el éxito y la
                sostenibilidad del software.
              </p>
            </div>
          </section>

          <section id="servicios" class="my-5">
            <h2>Nuestros Servicios</h2>
            <div class="row">
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Análisis de Calidad</h5>
                    <p class="card-text">
                      Evalua tu software utilizando modelos como ISO 25000,
                      FURPS y McCall.
                    </p>
                  </div>
                  <img
                    src={icono_calidad}
                    alt="Calidad"
                    width="100"
                    height="100"
                    class="centrar-imagen"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Matrices de Riesgo</h5>
                    <p class="card-text">
                      Identifica y gestiona riesgos para mejorar tus procesos.
                    </p>
                  </div>
                  <img
                    src={icono_matriz}
                    alt="Calidad"
                    width="100"
                    height="100"
                    class="centrar-imagen"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Informes Detallados</h5>
                    <p class="card-text">
                      Generamos informes en PDF para facilitar la toma de
                      decisiones.
                    </p>
                  </div>
                  <img
                    src={icono_informe}
                    alt="Calidad"
                    width="100"
                    height="100"
                    class="centrar-imagen"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
