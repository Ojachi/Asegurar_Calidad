from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import datetime
from io import BytesIO
from shared.database import get_db_connection, close_db_connection

def generate_pdf_report(software_id):
    connection = get_db_connection()
    try:
        # Obtener datos del software y sus evaluaciones
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM software WHERE id = %s", (software_id,))
            software = cursor.fetchone()
            
            cursor.execute("SELECT * FROM evaluations WHERE software_id = %s", (software_id,))
            evaluations = cursor.fetchall()

            cursor.execute("SELECT * FROM risks WHERE software_id = %s", (software_id,))
            risks = cursor.fetchall()
    finally:
        close_db_connection(connection)

    # Generar el PDF
    pdf_buffer = BytesIO()
    pdf = canvas.Canvas(pdf_buffer, pagesize=letter)
    pdf.setTitle(f"Reporte de Evaluación - {software['name']}")

    # Información del Software
    pdf.drawString(100, 750, f"Nombre del Software: {software['name']}")
    pdf.drawString(100, 730, f"Versión: {software['version']}")
    pdf.drawString(100, 710, f"Descripción: {software['description']}")

    # Evaluaciones
    y_position = 680
    pdf.drawString(100, y_position, "Evaluaciones de Calidad:")
    y_position -= 20
    for eval in evaluations:
        pdf.drawString(100, y_position, f"Modelo: {eval['model']} | Requisito: {eval['requirement']} | Puntuación: {eval['score']}")
        y_position -= 20

    # Matriz de Riesgos
    y_position -= 40
    pdf.drawString(100, y_position, "Matriz de Riesgos:")
    y_position -= 20
    for risk in risks:
        pdf.drawString(100, y_position, f"Fase: {risk['phase']} | Riesgo: {risk['risk_description']} | Nivel: {risk['risk_level']}")
        y_position -= 20

    pdf.save()
    pdf_buffer.seek(0)

    return pdf_buffer
