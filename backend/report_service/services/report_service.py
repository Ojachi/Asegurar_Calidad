import pdfkit
from jinja2 import Environment, FileSystemLoader
from models.report_model import create_report, get_reports_by_user
import os

TEMPLATE_DIR = 'templates'
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

def generate_pdf_report(user_id, software_id, evaluation_results, risk_results):
    template = env.get_template('report_template.html')
    html_content = template.render(
        evaluation_results=evaluation_results,
        risk_results=risk_results
    )
    
    # Generar el PDF
    pdf_path = f'reports/report_{software_id}_{user_id}.pdf'
    pdfkit.from_string(html_content, pdf_path)

    # Guardar en la base de datos
    create_report(user_id, software_id, evaluation_results, risk_results, pdf_path)
    return pdf_path

def get_user_reports(user_id):
    return get_reports_by_user(user_id)
