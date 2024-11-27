import pdfkit
from database import get_db_connection
import os
from jinja2 import Environment, FileSystemLoader

# Ruta absoluta al directorio de templates
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, "../templates")

# Configuración de Jinja2 para cargar los templates
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

# Ruta absoluta al directorio donde se guardarán los PDFs
REPORTS_DIR = os.path.join(BASE_DIR, "../reports")


def generate_pdf_report(evaluation_id):
    # Crear el directorio de reports si no existe
    if not os.path.exists(REPORTS_DIR):
        os.makedirs(REPORTS_DIR)

    # Obtenemos los detalles de la evaluación
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT e.date_evaluation, e.total_point, e.total_point_max, e.porc_global, 
                       r.name AS requirement_name, r.description AS requirement_description, 
                       rr.value, rr.val_max, rr.porcentaje, r.requirement_percentage AS requirement_percentage, m.name AS model_name, s.name AS software_name
                FROM result_model e
                INNER JOIN result_requirements rr ON e.id = rr.id_result_model
                INNER JOIN requirements r ON rr.id_requirement = r.id
                INNER JOIN model m ON e.id_model = m.id
                INNER JOIN software s ON e.id_software = s.id
                WHERE e.id = %s
                """,
                (evaluation_id,)
            )
            evaluation_data = cursor.fetchall()

        if not evaluation_data:
            raise ValueError(
                f"No se encontraron datos para la evaluación con ID {evaluation_id}")

    except Exception as e:
        raise Exception(
            f"Error al obtener los datos de la evaluación: {str(e)}")
    finally:
        connection.close()

    # Creamos el contenido HTML del reporte usando el template
    try:
        template = env.get_template('report_template.html')
        html_content = template.render(evaluation_data=evaluation_data)
    except Exception as e:
        raise Exception(f"Error al renderizar el template HTML: {str(e)}")

    # Generar el PDF
    pdf_path = os.path.normpath(os.path.join(
        REPORTS_DIR, f'report_{evaluation_id}.pdf'))

    print(f"Generando el PDF en la ruta: {pdf_path}")

    # Configuración de pdfkit para usar wkhtmltopdf
    try:
        # Cambia esta ruta según tu sistema
        config = pdfkit.configuration(
            wkhtmltopdf="C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe")
        pdfkit.from_string(html_content, pdf_path, configuration=config)
        if not os.path.exists(pdf_path):
            raise Exception("El archivo PDF no se generó correctamente")
    except Exception as e:
        raise Exception(f"Error al generar el PDF: {str(e)}")

    return pdf_path


def generate_pdf_report_risk(riskId):
    # Crear el directorio de reports si no existe
    if not os.path.exists(REPORTS_DIR):
        os.makedirs(REPORTS_DIR)

    # Obtenemos los detalles de la evaluación
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT r.id, r.description_risk, r.fase_affected, r.cause_root, 
                   r.probability, r.impact, r.probability_impact, r.level_risk, 
                   r.plan_mitigatino, r.code, s.name AS softwareName
                FROM resul_matriz r
                INNER JOIN software s ON r.id_software = s.id
                WHERE r.id = %s
                """,
                (riskId,)
            )
            evaluation_data = cursor.fetchall()

        if not evaluation_data:
            raise ValueError(
                f"No se encontraron datos para la evaluación con ID {riskId}")

    except Exception as e:
        raise Exception(
            f"Error al obtener los datos de la evaluación: {str(e)}")
    finally:
        connection.close()

    # Creamos el contenido HTML del reporte usando el template
    try:
        template = env.get_template('report2_template.html')
        html_content = template.render(evaluation_data=evaluation_data)
    except Exception as e:
        raise Exception(f"Error al renderizar el template HTML: {str(e)}")

    # Generar el PDF
    pdf_path = os.path.normpath(os.path.join(
        REPORTS_DIR, f'report_matriz_{riskId}.pdf'))

    print(f"Generando el PDF en la ruta: {pdf_path}")

    # Configuración de pdfkit para usar wkhtmltopdf
    try:
        # Cambia esta ruta según tu sistema
        config = pdfkit.configuration(
            wkhtmltopdf="C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe")
        pdfkit.from_string(html_content, pdf_path, configuration=config)
        if not os.path.exists(pdf_path):
            raise Exception("El archivo PDF no se generó correctamente")
    except Exception as e:
        raise Exception(f"Error al generar el PDF: {str(e)}")

    return pdf_path
