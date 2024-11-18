import React, { useEffect, useState } from 'react';
import { getSoftwareList } from '../services/softwareService';

const UserViewSoftware = () => {
    const [softwareList, setSoftwareList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSoftware = async () => {
            try {
                const data = await getSoftwareList();
                setSoftwareList(data);
            } catch (error) {
                setErrorMessage('Error al cargar el software registrado.');
            }
        };
        fetchSoftware();
    }, []);

    return (
        <div className="software-list-container">
            <h2>Software Registrado</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <ul>
                {softwareList.map((software) => (
                    <li key={software.id}>
                        <h3>{software.name}</h3>
                        <p>Versión: {software.version}</p>
                        <p>Descripción: {software.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserViewSoftware;
