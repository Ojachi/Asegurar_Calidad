from flask import Blueprint, request, send_file
from services.report_service import generate_pdf_report
from utils.auth_utils import check_user
from shared.utils import response

report_bp = Blueprint('report', __name__)

@report_bp.route('/generate', methods=['GET'])
def generate_report():
    user_data = check_user()
    if not user_data:
        return response("No autorizado", 403)

    software_id = request.args.get('software_id')
    if not software_id:
        return response("Software ID no proporcionado", 400)

    pdf_buffer = generate_pdf_report(software_id)
    return send_file(pdf_buffer, as_attachment=True, download_name=f"reporte_{software_id}.pdf", mimetype='application/pdf')
