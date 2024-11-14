from flask import Blueprint, request, jsonify
from services.risk_service import add_risk, get_risks
from utils.auth_utils import check_user
from shared.utils import response
import datetime

risk_bp = Blueprint('risk', __name__)

@risk_bp.route('/evaluate', methods=['POST'])
def create_risk():
    user_data = check_user()
    if not user_data:
        return response("No autorizado", 403)

    data = request.json
    if not data or not all(k in data for k in ('software_id', 'phase', 'risk_description', 'probability', 'impact')):
        return response("Datos incompletos", 400)

    evaluation_date = datetime.datetime.utcnow()
    result = add_risk(data['software_id'], user_data['user_id'], data['phase'], 
                      data['risk_description'], data['probability'], data['impact'], evaluation_date)
    return response(result['message'], 201, {"risk_level": result['risk_level']})

@risk_bp.route('/risks/<software_id>', methods=['GET'])
def list_risks(software_id):
    user_data = check_user()
    if not user_data:
        return response("No autorizado", 403)

    risks = get_risks(software_id)
    return response("Lista de riesgos", 200, risks)
