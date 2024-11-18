import React, { useEffect, useState } from 'react';
import { getReports, downloadReport } from '../services/reportService';

const Report = () => {
    const [reports, setReports] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Cargar los reportes al cargar la página
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (error) {
                setErrorMessage('Error al cargar los reportes.');
            }
        };
        fetchReports();
    }, []);

    const handleDownload = async (reportId) => {
        try {
            await downloadReport(reportId);
        } catch (error) {
            alert('Error al descargar el reporte.');
        }
    };

    return (
        <div className="report-container">
            <h2>Reportes Generados</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {reports.length === 0 ? (
                <p>No hay reportes disponibles</p>
            ) : (
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Software</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.softwareName}</td>
                                <td>{report.date}</td>
                                <td>
                                    <button onClick={() => handleDownload(report.id)}>Descargar PDF</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Report;
