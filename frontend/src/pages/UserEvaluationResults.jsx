import React, { useEffect, useState } from "react";
import { getUserEvaluations, getEvaluationDetails } from "../services/evaluationService";

const UserEvaluationResults = () => {
  const [evaluations, setEvaluations] = useState([]); // Lista de evaluaciones
  const [selectedEvaluation, setSelectedEvaluation] = useState(null); // Evaluación seleccionada
  const [errorMessage, setErrorMessage] = useState("");

  const id_user = localStorage.getItem("id");

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const data = await getUserEvaluations(id_user); // Llama al servicio para obtener evaluaciones
        setEvaluations(data); // Se espera que el backend devuelva un array de evaluaciones
      } catch (error) {
        setErrorMessage("Error al cargar los resultados de las evaluaciones.");
      }
    };
    fetchEvaluations();
  }, [id_user]);

  const handleViewDetails = async (evaluationId) => {
    try {
      const details = await getEvaluationDetails(evaluationId); // Obtén los detalles de la evaluación
      setSelectedEvaluation(details); // Cambia a la vista de detalles
      console.log(details); // Debug: Ver los detalles en la consola
    } catch (error) {
      setErrorMessage("Error al cargar los detalles de la evaluación.");
    }
  };

  const handleBackToList = () => {
    setSelectedEvaluation(null); // Regresa a la lista de evaluaciones
  };

  return (
    <div className="evaluation-results-container">
      <h2>Resultados de Evaluación</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Vista de Detalles */}
      {selectedEvaluation ? (
        <div className="evaluation-details">
          <h3>Detalles de la Evaluación</h3>
          <table className="evaluation-details-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Requerimiento</th>
                <th>Descripción</th>
                <th>Valor</th>
                <th>Máximo</th>
                <th>% Resultado</th>
                
              </tr>
            </thead>
            <tbody>
              {selectedEvaluation.data.requirements.map((requirement, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{requirement.requirement_name}</td>
                  <td>{requirement.requirement_description}</td>
                  <td>{requirement.value}</td>
                  <td>{requirement.val_max}</td>
                  <td>{parseFloat(requirement.porcentaje)}%</td>                 
                </tr>
              ))}
            </tbody>
          </table>
          <div className="evaluation-summary">
            <p>
              <strong>Total Puntaje:</strong> {selectedEvaluation.data.total_score} /{" "}
              {selectedEvaluation.data.total_max_score}
            </p>
            <p>
              <strong>% Global:</strong> {parseFloat(selectedEvaluation.data.global_percentage)}%
            </p>
          </div>
          <button onClick={handleBackToList}>Volver a la Lista</button>
        </div>
      ) : (
        // Vista de Lista de Evaluaciones
        <div>
          {evaluations.length === 0 ? (
            <p>No hay evaluaciones registradas.</p>
          ) : (
            <table className="evaluation-table">
              <thead>
                <tr>
                  <th>Software</th>
                  <th>Modelo</th>
                  <th>Fecha</th>
                  <th>Puntaje Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {evaluations.map((evaluation) => (
                  <tr key={evaluation.evaluation_id}>
                    <td>{evaluation.software_name}</td>
                    <td>{evaluation.model_name}</td>
                    <td>{new Date(evaluation.date_evaluation).toLocaleDateString()}</td>
                    <td>{evaluation.total_point}</td>
                    <td>
                      <button onClick={() => handleViewDetails(evaluation.evaluation_id)}>Ver Detalles</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default UserEvaluationResults;
