import React, { useState } from 'react';
import { submitRiskMatrix } from '../services/riskService';

const RiskMatrix = ({ softwareId }) => {
    const [riskItems, setRiskItems] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddRiskItem = () => {
        setRiskItems([...riskItems, { description: '', probability: '', impact: '' }]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...riskItems];
        updatedItems[index][field] = value;
        setRiskItems(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitRiskMatrix(softwareId, riskItems);
            setSuccessMessage('Matriz de riesgos enviada exitosamente');
            setRiskItems([]);
        } catch (error) {
            setErrorMessage('Error al enviar la matriz de riesgos. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="risk-matrix-container">
            <h2>Matriz de Riesgos</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                {riskItems.map((item, index) => (
                    <div key={index} className="risk-item">
                        <input
                            type="text"
                            placeholder="Descripción del riesgo"
                            value={item.description}
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                            required
                        />
                        <select
                            value={item.probability}
                            onChange={(e) => handleInputChange(index, 'probability', e.target.value)}
                            required
                        >
                            <option value="">Probabilidad</option>
                            <option value="1">Raro</option>
                            <option value="2">Improbable</option>
                            <option value="3">Posible</option>
                            <option value="4">Probable</option>
                            <option value="5">Casi seguro</option>
                        </select>
                        <select
                            value={item.impact}
                            onChange={(e) => handleInputChange(index, 'impact', e.target.value)}
                            required
                        >
                            <option value="">Impacto</option>
                            <option value="1">Insignificante</option>
                            <option value="2">Menor</option>
                            <option value="3">Moderado</option>
                            <option value="4">Mayor</option>
                            <option value="5">Catastrófico</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={handleAddRiskItem}>Agregar Riesgo</button>
                <button type="submit">Enviar Matriz de Riesgos</button>
            </form>
        </div>
    );
};

export default RiskMatrix;
