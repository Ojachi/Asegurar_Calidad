import React, { useState, useEffect } from "react";
import {
  getEvaluationQuestions,
  submitEvaluation,
} from "../services/evaluationService";
import { useNavigate } from "react-router-dom";

const EvaluationForm = () => {
  const [requirements, setRequirements] = useState([]); // Lista de requerimientos
  const [responses, setResponses] = useState({}); // Respuestas del usuario
  const [currentRequirementIndex, setCurrentRequirementIndex] = useState(0); // Índice del requerimiento actual
  const navigate = useNavigate();

  const id_model = localStorage.getItem("model");
  const softwareId = localStorage.getItem("selectedSoftwareId");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getEvaluationQuestions(id_model);
        setRequirements(data);
      } catch (error) {
        console.error("Error al cargar las preguntas de evaluación.", error);
      }
    };
    fetchQuestions();
  }, [id_model]);

  // Manejar el cambio de respuestas
  const handleResponseChange = (questionId, score) => {
    setResponses({
      ...responses,
      [questionId]: parseInt(score),
    });
  };

  // Cambiar al siguiente requerimiento
  const handleNext = () => {
    if (currentRequirementIndex < requirements.length - 1) {
      setCurrentRequirementIndex(currentRequirementIndex + 1);
    }
  };

  // Enviar los resultados al backend
  const handleSubmit = async () => {
    try {
      // Calcula los resultados directamente dentro de handleSubmit
      const requerimientoResultados = requirements.map((req) => {
        const preguntas = req.questions;
        const puntajeRequerimiento = preguntas.reduce((total, pregunta) => {
          return total + (responses[pregunta.question_id] || 0);
        }, 0);
  
        const totalMaximoPosible = preguntas.length * 3;
        const porcentajeGlobalRequerimiento =
          (puntajeRequerimiento * req.requirement_percentage) /
          totalMaximoPosible;
  
        return {
          requirement_id: req.requirement_id,
          puntaje_requerimiento: puntajeRequerimiento,
          total_maximo_posible: totalMaximoPosible,
          porcentaje_global: porcentajeGlobalRequerimiento,
        };
      });
  
      const puntajeTotal = requerimientoResultados.reduce(
        (total, req) => total + req.puntaje_requerimiento,
        0
      );
      const puntajeMaximoPosible = requerimientoResultados.reduce(
        (total, req) => total + req.total_maximo_posible,
        0
      );
      const porcentajeGlobalModelo = requerimientoResultados.reduce(
        (total, req) => total + req.porcentaje_global,
        0
      );
  
      // Envía los datos calculados directamente
      await submitEvaluation({
        softwareId,
        results: requerimientoResultados,
        modelResult: {
          puntaje_total: puntajeTotal,
          puntaje_maximo_posible: puntajeMaximoPosible,
          porcentaje_global_modelo: porcentajeGlobalModelo,
        },
        id_model,
      });
  
      // Limpia el almacenamiento local y redirige
      localStorage.removeItem("model");
      localStorage.removeItem("selectedSoftwareId");
      alert("Evaluación enviada correctamente.");
      setTimeout(() => navigate("/user/view-evaluations"), 1000);
    } catch (error) {
      console.error("Error al enviar la evaluación.", error);
      alert("Hubo un error al enviar la evaluación.");
    }
  };
  

  // Requerimiento actual
  const currentRequirement = requirements[currentRequirementIndex];

  return (
    <div className="evaluation-form-container">
      <h2>Evaluación de Software</h2>
      {currentRequirement ? (
        <>
          <div className="requeriment-info">
            <h3>{currentRequirement.requirement_name}</h3>
            <p>{currentRequirement.requirement_description}</p>
            <hr />
          </div>
          <form className="form-inline"> 
            {currentRequirement.questions.map((question) => (
              <div key={question.question_id} className="form-group ">
                <label className="col-sm-8 col-form-label ">
                  {question.question_text}
                </label>
                
                  <select
                    value={responses[question.question_id] || ""}
                    onChange={(e) =>
                      handleResponseChange(question.question_id, e.target.value)
                    }
                    className=""
                    id="selectEdit"
                    required
                  >
                    <option value="">Seleccione una puntuación</option>
                    <option value="1">1 - En desacuerdo</option>
                    <option value="2">2 - De acuerdo</option>
                    <option value="3">3 - Totalmente de acuerdo</option>
                  </select>
                  <hr />
              </div>
            ))}
          </form>
          <div className="navigation-buttons">
            {currentRequirementIndex < requirements.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>Siguiente</button>
            ) : (
              <button className="btn btn-success" onClick={handleSubmit}>Enviar</button>
            )}
          </div>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default EvaluationForm;
