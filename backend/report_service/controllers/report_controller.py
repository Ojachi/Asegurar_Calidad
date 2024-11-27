from flask import Blueprint, send_file
from services.report_service import generate_pdf_report, generate_pdf_report_risk
from utils import handle_error

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate-pdf/<int:evaluation_id>', methods=['GET'])
def generate_evaluation_pdf(evaluation_id):
    try:
        pdf_path = generate_pdf_report(evaluation_id)
        return send_file(pdf_path, as_attachment=True, mimetype='application/pdf')
    except Exception as e:
        return handle_error(f"Error al generar el PDF: {str(e)}", 500)
    
    
@report_bp.route('/generate-pdf-risk/<int:riskId>', methods=['GET'])
def generate_evaluation_pdf_risk(riskId):
    try:
        pdf_path = generate_pdf_report_risk(riskId)
        return send_file(pdf_path, as_attachment=True, mimetype='application/pdf')
    except Exception as e:
        return handle_error(f"Error al generar el PDF: {str(e)}", 500)

