import React, { useState, useEffect } from 'react';
import { getEvaluationQuestions, submitEvaluation } from '../services/evaluationService';

const EvaluationForm = ({ softwareId }) => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getEvaluationQuestions();
                setQuestions(data);
            } catch (error) {
                setErrorMessage('Error al cargar las preguntas de evaluación.');
            }
        };
        fetchQuestions();
    }, []);

    const handleResponseChange = (questionId, score) => {
        setResponses({
            ...responses,
            [questionId]: score,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitEvaluation(softwareId, responses);
            setSuccessMessage('Evaluación completada exitosamente');
            setResponses({});
        } catch (error) {
            setErrorMessage('Error al enviar la evaluación. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="evaluation-form-container">
            <h2>Evaluación de Software</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question.id} className="question-item">
                        <label>{question.text}</label>
                        <select
                            value={responses[question.id] || ''}
                            onChange={(e) => handleResponseChange(question.id, e.target.value)}
                            required
                        >
                            <option value="">Seleccione una puntuación</option>
                            <option value="1">1 - En desacuerdo</option>
                            <option value="2">2 - De acuerdo</option>
                            <option value="3">3 - Totalmente de acuerdo</option>
                        </select>
                    </div>
                ))}
                <button type="submit">Enviar Evaluación</button>
            </form>
        </div>
    );
};

export default EvaluationForm;
