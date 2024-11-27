import React, { useEffect, useState } from 'react';
import { getQuestions, addQuestion, getModels, getRequirements } from '../services/adminService';
import { logout } from '../services/authService';

const AdminManageQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [models, setModels] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedRequirement, setSelectedRequirement] = useState('');
    const [newQuestion, setNewQuestion] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 15;

    // Fetch questions, models, and requirements
    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionsData = await getQuestions();
                const modelsData = await getModels();
                setQuestions(questionsData);
                setModels(modelsData.data);
            } catch (error) {
                setErrorMessage('Error al cargar los datos.');
            }
        };
        fetchData();
    }, []);

    const fetchRequirements = async (modelId) => {
        try {
            const requirementsData = await getRequirements(modelId);
            setRequirements(requirementsData.data);
        } catch (error) {
            setErrorMessage('Error al cargar los requerimientos.');
        }
    };

    const handleAddQuestion = async () => {
        if (!newQuestion || !selectedRequirement) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }
        try {
            await addQuestion(newQuestion, selectedRequirement);
            setNewQuestion('');
            setSelectedModel('');
            setSelectedRequirement('');
            alert("Pregunta agregado con éxito");
            window.location.reload();
        } catch (error) {
            setErrorMessage('Error al agregar la pregunta.');
        }
    };

    // Pagination logic
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const totalPages = Math.ceil(questions.length / questionsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="admin-manage-questions-container">
            <h2>Gestionar Preguntas</h2>
            <button className='btn btn-outline-secondary logout' onClick={handleLogout}>
                Cerrar Sesión
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}

            <div className="add-question">
                <select
                    value={selectedModel}
                    onChange={(e) => {
                        setSelectedModel(e.target.value);
                        fetchRequirements(e.target.value);
                    }}
                    className='form-select addQuest'
                >
                    <option value="">Seleccione un Modelo</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedRequirement}
                    onChange={(e) => setSelectedRequirement(e.target.value)}
                    disabled={!selectedModel}
                    className='form-select addQuest'
                >
                    <option value="">Seleccione un Requerimiento</option>
                    {requirements.map((req) => (
                        <option key={req.id} value={req.id}>
                            {req.name}
                        </option>
                    ))}
                </select>

                <textarea
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Nueva pregunta"
                    className='form-control addQuest'
                />
                <button onClick={handleAddQuestion} className='btn btn-primary btnADD' >Agregar</button>
            </div>

            <div className="question-list">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Requerimiento</th>
                            <th>Modelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.map((question) => (
                            <tr key={question.id}>
                                <td>{question.description}</td>
                                <td>{question.requirement_name}</td>
                                <td>{question.model_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className='btn btn-secondary'>
                        Anterior
                    </button>
                    <span className='espan'>
                        Página {currentPage} de {totalPages} 
                    </span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className='btn btn-secondary' >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminManageQuestions;
    