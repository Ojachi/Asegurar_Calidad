import React, { useEffect, useState } from 'react';
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from '../services/adminService';

const AdminManageQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions();
                setQuestions(data);
            } catch (error) {
                setErrorMessage('Error al cargar las preguntas.');
            }
        };
        fetchQuestions();
    }, []);

    const handleAddQuestion = async () => {
        if (newQuestion.trim() === '') return;
        try {
            await addQuestion(newQuestion);
            setNewQuestion('');
            window.location.reload();
        } catch (error) {
            setErrorMessage('Error al agregar la pregunta.');
        }
    };

    const handleDelete = async (questionId) => {
        try {
            await deleteQuestion(questionId);
            window.location.reload();
        } catch (error) {
            setErrorMessage('Error al eliminar la pregunta.');
        }
    };

    return (
        <div className="admin-manage-questions-container">
            <h2>Gestionar Preguntas</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="question-list">
                {questions.map((question) => (
                    <div key={question.id} className="question-item">
                        <p>{question.text}</p>
                        <button onClick={() => handleDelete(question.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <div className="add-question">
                <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Nueva pregunta"
                />
                <button onClick={handleAddQuestion}>Agregar</button>
            </div>
        </div>
    );
};

export default AdminManageQuestions;
