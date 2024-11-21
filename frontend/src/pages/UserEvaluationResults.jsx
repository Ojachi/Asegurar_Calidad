import React, { useEffect, useState } from 'react';
import { getUserEvaluations } from '../services/evaluationService';

const UserEvaluationResults = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const data = await getUserEvaluations();
                setEvaluations(data);
            } catch (error) {
                setErrorMessage('Error al cargar los resultados de las evaluaciones.');
            }
        };
        fetchEvaluations();
    }, []);

    return (
        <div className="evaluation-results-container">
            <h2>Resultados de Evaluación</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {evaluations.length === 0 ? (
                <p>No hay evaluaciones registradas.</p>
            ) : (
                <table className="evaluation-table">
                    <thead>
                        <tr>
                            <th>Software</th>
                            <th>Fecha</th>
                            <th>Puntuación</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map((evaluation) => (
                            <tr key={evaluation.id}>
                                <td>{evaluation.softwareName}</td>
                                <td>{evaluation.date}</td>
                                <td>{evaluation.score}%</td>
                                <td>
                                    <button onClick={() => window.alert('Ver detalles no implementado aún')}>
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserEvaluationResults;
