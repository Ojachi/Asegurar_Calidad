import React, { useEffect, useState } from 'react';
import { getAllEvaluations } from '../services/adminService';

const AdminViewEvaluations = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const data = await getAllEvaluations();
                setEvaluations(data);
            } catch (error) {
                setErrorMessage('Error al cargar las evaluaciones.');
            }
        };
        fetchEvaluations();
    }, []);

    return (
        <div className="admin-evaluations-container">
            <h2>Evaluaciones de Usuarios</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {evaluations.length === 0 ? (
                <p>No hay evaluaciones registradas.</p>
            ) : (
                <table className="evaluation-table">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Software</th>
                            <th>Fecha</th>
                            <th>Puntuación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map((evaluation) => (
                            <tr key={evaluation.id}>
                                <td>{evaluation.username}</td>
                                <td>{evaluation.softwareName}</td>
                                <td>{evaluation.date}</td>
                                <td>{evaluation.score}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminViewEvaluations;
