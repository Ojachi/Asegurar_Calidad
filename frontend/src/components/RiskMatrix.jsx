import React, { useState } from "react";
import { submitRiskMatrix } from "../services/riskService";
import { useNavigate } from "react-router-dom";

const RiskMatrix = () => {
  const [riskItems, setRiskItems] = useState([]);
  const [newRisk, setNewRisk] = useState({
    code: "",
    description: "",
    fase: "",
    cause: "",
    probability: "",
    impact: "",
    contingency: "",
  });

  const navigate = useNavigate();

  const softwareId = localStorage.getItem("selectedSoftwareId");

  // Función para calcular Probabilidad x Impacto y Nivel de Riesgo
  const calculateRisk = (probability, impact) => {
    const probabilityImpact = probability * impact;
    let levelRisk = "";
    if (probabilityImpact >= 0 && probabilityImpact <= 7) levelRisk = "Bajo";
    else if (probabilityImpact >= 8 && probabilityImpact <= 13)
      levelRisk = "Medio";
    else if (probabilityImpact >= 14 && probabilityImpact <= 19)
      levelRisk = "Alto";
    else if (probabilityImpact >= 20 && probabilityImpact <= 25)
      levelRisk = "Muy Alto";

    return { probabilityImpact, levelRisk };
  };

  const handleInputChange = (field, value) => {
    setNewRisk({
      ...newRisk,
      [field]: value,
    });
  };

  const handleAddRisk = () => {
    if (
      !newRisk.description ||
      !newRisk.fase ||
      !newRisk.probability ||
      !newRisk.impact
    ) {
      alert("Por favor, complete todos los campos antes de agregar un riesgo.");
      return;
    }
    const { probabilityImpact, levelRisk } = calculateRisk(
      parseInt(newRisk.probability),
      parseInt(newRisk.impact)
    );

    const riskCode = `R-${riskItems.length + 1}`; // Asigna el código correctamente

    setRiskItems([
      ...riskItems,
      {
        ...newRisk,
        code: riskCode, // Usa el código generado
        probabilityImpact,
        levelRisk,
      },
    ]);
    setNewRisk({
      code: "",
      description: "",
      fase: "",
      cause: "",
      probability: "",
      impact: "",
      contingency: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (riskItems.length === 0) {
      alert("No hay riesgos para enviar.");
      return;
    }
    try {
      await submitRiskMatrix(softwareId, riskItems);
      alert("Matriz de riesgos enviada exitosamente.");
      setRiskItems([]);
      setTimeout(() => navigate("/user/view-evaluations"), 1000);
    } catch (error) {
      alert("Error al enviar la matriz de riesgos. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="risk-matrix-container">
      <h2>Matriz de Riesgos</h2>

      {/* Formulario para agregar riesgos */}
      <h3>Agregar Riesgo</h3>
      <div className="row g-2">
        <div className="col-md">
          <textarea
            type="text"
            placeholder="Descripción del Riesgo"
            value={newRisk.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="form-control espacio"
            required
          />
          <input
            type="text"
            placeholder="Fase Afectada"
            value={newRisk.fase}
            onChange={(e) => handleInputChange("fase", e.target.value)}
            className="form-control espacio"
            required
          />
        </div>
        <div className="col-md">
          <textarea
            type="text"
            placeholder="Causa Raíz"
            value={newRisk.cause}
            onChange={(e) => handleInputChange("cause", e.target.value)}
            className="form-control espacio"
            required
          />
          <select
            value={newRisk.probability}
            onChange={(e) => handleInputChange("probability", e.target.value)}
            className="form-select espacio"
            required
          >
            <option value="">Estimación de Probabilidad</option>
            <option value="1">1 - Muy Baja</option>
            <option value="2">2 - Baja</option>
            <option value="3">3 - Media</option>
            <option value="4">4 - Alta</option>
            <option value="5">5 - Muy Alta</option>
          </select>
        </div>
        <div className="col-md">
          <select
            value={newRisk.impact}
            onChange={(e) => handleInputChange("impact", e.target.value)}
            className="form-select espacio"
            required
          >
            <option value="">Estimación de Impacto</option>
            <option value="1">1 - Insignificante</option>
            <option value="2">2 - Menor</option>
            <option value="3">3 - Moderado</option>
            <option value="4">4 - Mayor</option>
            <option value="5">5 - Catastrófico</option>
          </select>
          <textarea
            type="text"
            placeholder="Plan de Contingencia"
            value={newRisk.contingency}
            onChange={(e) => handleInputChange("contingency", e.target.value)}
            className="form-control espacio"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleAddRisk}
        className="btn btn-primary addRisk"
      >
        Agregar Riesgo
      </button>
      {/* Tabla de riesgos */}
      <h3>Lista de Riesgos</h3>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Fase</th>
              <th>Causa Raíz</th>
              <th>Probabilidad</th>
              <th>Impacto</th>
              <th>Probabilidad x Impacto</th>
              <th>Nivel de Riesgo</th>
              <th>Contingencia</th>
            </tr>
          </thead>
          <tbody>
            {riskItems.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.description}</td>
                <td>{item.fase}</td>
                <td>{item.cause}</td>
                <td>{item.probability}</td>
                <td>{item.impact}</td>
                <td>{item.probabilityImpact}</td>
                <td>{item.levelRisk}</td>
                <td>{item.contingency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para enviar la matriz */}
      <button onClick={handleSubmit} className="btn btn-success">
        Enviar Matriz de Riesgos
      </button>
    </div>
  );
};

export default RiskMatrix;
