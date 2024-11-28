import React, { useEffect, useState } from "react";
import {
  getUserEvaluations,
  getEvaluationDetails,
} from "../services/evaluationService";
import {
  getUserRiskMatrices,
  getRiskMatrixDetails,
} from "../services/riskService";
import axios from "axios";
import { getToken } from "../services/authService";

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
        setEvaluations(evals.data);
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

  const handleDownloadPdf = async (evaluationId) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/report/generate-pdf/${evaluationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Esto asegura que se reciba como archivo binario
        }
      );

      // Crear un enlace temporal para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `evaluation_${evaluationId}.pdf`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      alert("No se pudo descargar el PDF. Inténtalo nuevamente.");
    }
  };

  const handleDownloadPdfRisk = async (riskId) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/report/generate-pdf-risk/${riskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Esto asegura que se reciba como archivo binario
        }
      );

      // Crear un enlace temporal para descargar el PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Matriz_${riskId}.pdf`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      alert("No se pudo descargar el PDF. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="evaluation-result-container">
      <h2>Resultados de Evaluación</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Vista de Detalles */}
      {selectedEvaluation ? (
        <div className="contenedorModelos1">
          <h3>Detalles de la Evaluación</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Requerimiento</th>
                <th>Descripción</th>
                <th>Valor</th>
                <th>Máximo</th>
                <th>% Resultado</th>
                <th>% Maximo Posible</th>
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
                    <td>{parseFloat(requirement.requirement_percentage)}%</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          <div className="evaluation-summary">
            <p className="porc_global">
              <strong>Total Puntaje</strong>{" "}
              <div className="result">
                {selectedEvaluation.data.total_score} /{" "}
                {selectedEvaluation.data.total_max_score}
              </div>
            </p>
            <p className="porc_global">
              <strong>% Global</strong>{" "}
              <div className="result">
                {parseFloat(selectedEvaluation.data.global_percentage)}%
              </div>
            </p>
          </div>
          <button onClick={handleBackToList} className="btn btn-secondary" >Volver a la Lista</button>
        </div>
      ) : selectedRiskMatrix ? (
        <div className="contenedorModelos1">
          <h3>Detalles de la Matriz de Riesgos</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Descripción</th>
                <th>Fase</th>
                <th>Causa</th>
                <th>Probabilidad</th>
                <th>Impacto</th>
                <th>Probabilidad x Impacto</th>
                <th>Nivel De Risgo</th>
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
          <button onClick={handleBackToList} className="btn btn-secondary" >Volver</button>
        </div>
      ) : (
        // Vista de Lista de Evaluaciones
        <div className="contenedorModelos">
          <h3>Evaluaciones Modelos</h3>
          {evaluations.length === 0 ? (
            <p>No hay resultados registradas.</p>
          ) : (
            <table className="table">
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
                  <tr className="" key={evaluation.evaluation_id}>
                    <td>{evaluation.software_name}</td>
                    <td>{evaluation.model_name}</td>
                    <td>
                      {new Date(
                        evaluation.date_evaluation
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {evaluation.total_point} / {evaluation.total_point_max}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleViewEvaluationDetails(evaluation.evaluation_id)
                        }
                        className="btn btn-info"
                      >
                        Ver Detalles
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadPdf(evaluation.evaluation_id)
                        }
                        className="btn btn-secondary acciondownload"
                      >
                        Descargar PDF
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
            <table className="table">
              <thead>
                <tr>
                  <th>Software</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {riskMatrices.map((risk) => (
                  <tr key={risk.id_matrix}>
                    <td>{risk.software_name}</td>
                    <td>
                      {new Date(
                        risk.date_evaluation
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewRiskMatrixDetails(risk.id_matrix)}
                        className="btn btn-info"
                      >
                        Ver Detalles
                      </button>
                      <button
                        onClick={() => handleDownloadPdfRisk(risk.id_matrix)}
                        className="btn btn-secondary acciondownload"
                      >
                        Descargar PDF
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
