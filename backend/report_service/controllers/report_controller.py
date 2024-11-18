from flask import Blueprint, request, send_file
from services.report_service import generate_pdf_report, get_user_reports
from utils import handle_error, success_response

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate', methods=['POST'])
def generate_report():
    data = request.json
    user_id = data.get('user_id')
    software_id = data.get('software_id')
    evaluation_results = data.get('evaluation_results')
    risk_results = data.get('risk_results')

    if not all([user_id, software_id, evaluation_results, risk_results]):
        return handle_error("Faltan datos", 400)

    pdf_path = generate_pdf_report(user_id, software_id, evaluation_results, risk_results)
    return success_response({"pdf_path": pdf_path})

@report_bp.route('/download/<int:report_id>', methods=['GET'])
def download_report(report_id):
    reports = get_user_reports(report_id)
    if not reports:
        return handle_error("Reporte no encontrado", 404)
    
    pdf_path = reports[0]['pdf_path']
    return send_file(pdf_path, as_attachment=True)
