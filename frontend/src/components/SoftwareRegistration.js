import React, { useState } from 'react';
import { registerSoftware } from '../services/softwareService';
import { useNavigate } from 'react-router-dom';

const SoftwareRegistration = () => {
    const [name, setName] = useState('');
    const [version, setVersion] = useState('');
    const [description, setDescription] = useState('');
    const [developer, setDeveloper] = useState('');
    const [contact, setContact] = useState('');
    const [owner, setOwner] = useState('');
    const [license, setLicense] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await registerSoftware({ name, version, description, developer, contact, owner, license });
            setSuccessMessage('Software registrado exitosamente');
            setTimeout(() => navigate('/user'), 2000); // Redirigir al dashboard de usuario
        } catch (error) {
            setErrorMessage('Error al registrar el software. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="software-registration-container">
            <h2>Registrar Software</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleRegister}>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Versión:</label>
                <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} required />

                <label>Descripción:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Desarrollador:</label>
                <input type="text" value={developer} onChange={(e) => setDeveloper(e.target.value)} required />

                <label>Contacto:</label>
                <input type="email" value={contact} onChange={(e) => setContact(e.target.value)} required />

                <label>Propietario:</label>
                <input type="text" value={owner} onChange={(e) => setOwner(e.target.value)} required />

                <label>Licencia:</label>
                <input type="text" value={license} onChange={(e) => setLicense(e.target.value)} required />

                <button type="submit">Registrar Software</button>
            </form>
        </div>
    );
};

export default SoftwareRegistration;
