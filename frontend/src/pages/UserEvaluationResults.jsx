import React, { useEffect, useState } from "react";
import {
  getUserEvaluations,
  getEvaluationDetails,
} from "../services/evaluationService";
import {
  getUserRiskMatrices,
  getRiskMatrixDetails,
} from "../services/riskService";

const UserEvaluationResults = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [riskMatrices, setRiskMatrices] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedRiskMatrix, setSelectedRiskMatrix] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const id_user = localStorage.getItem("id");

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const evals = await getUserEvaluations(id_user);
        setEvaluations(evals);
        const risks = await getUserRiskMatrices(id_user);
        setRiskMatrices(risks);
      } catch (error) {
        setErrorMessage("Error al cargar los resultados.");
      }
    };
    fetchEvaluations();
  }, [id_user]);

  const handleViewEvaluationDetails = async (evaluationId) => {
    try {
      const details = await getEvaluationDetails(evaluationId);
      setSelectedEvaluation(details);
    } catch (error) {
      setErrorMessage("Error al cargar los detalles de la evaluación.");
    }
  };

  const handleViewRiskMatrixDetails = async (riskId) => {
    try {
      const details = await getRiskMatrixDetails(riskId);
      setSelectedRiskMatrix(details);
    } catch (error) {
      setErrorMessage("Error al cargar los detalles de la matriz de riesgos.");
    }
  };

  const handleBackToList = () => {
    setSelectedEvaluation(null);
    setSelectedRiskMatrix(null);
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
              {selectedEvaluation.data.requirements.map(
                (requirement, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{requirement.requirement_name}</td>
                    <td>{requirement.requirement_description}</td>
                    <td>{requirement.value}</td>
                    <td>{requirement.val_max}</td>
                    <td>{parseFloat(requirement.porcentaje)}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="evaluation-summary">
            <p>
              <strong>Total Puntaje:</strong>{" "}
              {selectedEvaluation.data.total_score} /{" "}
              {selectedEvaluation.data.total_max_score}
            </p>
            <p>
              <strong>% Global:</strong>{" "}
              {parseFloat(selectedEvaluation.data.global_percentage)}%
            </p>
          </div>
          <button onClick={handleBackToList}>Volver a la Lista</button>
        </div>
      ) : selectedRiskMatrix ? (
        <div className="risk-matrix-details">
          <h3>Detalles de la Matriz de Riesgos</h3>
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripción</th>
                <th>Fase</th>
                <th>Causa</th>
                <th>Probabilidad</th>
                <th>Impacto</th>
                <th>P x I</th>
                <th>Nivel</th>
                <th>Mitigación</th>
              </tr>
            </thead>
            <tbody>
              {selectedRiskMatrix.map((risk, index) => (
                <tr key={index}>
                  <td>{risk.code}</td>
                  <td>{risk.description_risk}</td>
                  <td>{risk.fase_affected}</td>
                  <td>{risk.cause_root}</td>
                  <td>{risk.probability}</td>
                  <td>{risk.impact}</td>
                  <td>{risk.probability_impact}</td>
                  <td>{risk.level_risk}</td>
                  <td>{risk.plan_mitigatino}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleBackToList}>Volver</button>
        </div>
      ) : (
        // Vista de Lista de Evaluaciones
        <div>
          <h3>Evaluaciones Modelos</h3>
          {evaluations.length === 0 ? (
            <p>No hay resultados registradas.</p>
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
                    <td>
                      {new Date(
                        evaluation.date_evaluation
                      ).toLocaleDateString()}
                    </td>
                    <td>{evaluation.total_point}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleViewEvaluationDetails(evaluation.evaluation_id)
                        }
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h3>Matrices de Riesgos</h3>
          {riskMatrices.length === 0 ? (
            <p>No hay matrices de riesgos registradas.</p>
          ) : (
            <table className="risk-matrix-table">
              <thead>
                <tr>
                  <th>Software</th>
                  <th>Descripción</th>
                  <th>Fase</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {riskMatrices.map((risk) => (
                  <tr key={risk.id}>
                    <td>{risk.software_name}</td>
                    <td>{risk.description_risk}</td>
                    <td>{risk.fase_affected}</td>
                    <td>
                      <button
                        onClick={() => handleViewRiskMatrixDetails(risk.id)}
                      >
                        Ver Detalles
                      </button>
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
