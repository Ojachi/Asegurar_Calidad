from flask import Blueprint, request
from services.risk_service import add_risk, get_software_risks, remove_risk
from utils import handle_error, success_response

risk_bp = Blueprint('risk', __name__)

@risk_bp.route('/risks', methods=['POST'])
def create_risk():
    data = request.json
    software_id = data.get('software_id')
    description = data.get('description')
    phase = data.get('phase')
    probability = data.get('probability')
    impact = data.get('impact')
    user_id = data.get('user_id')

    if not all([software_id, description, phase, probability, impact, user_id]):
        return handle_error("Faltan datos", 400)

    add_risk(software_id, description, phase, probability, impact, user_id)
    return success_response("Riesgo creado exitosamente")

@risk_bp.route('/risks/<int:software_id>', methods=['GET'])
def list_risks(software_id):
    risks = get_software_risks(software_id)
    return success_response(risks)

@risk_bp.route('/risks/<int:risk_id>', methods=['DELETE'])
def delete_risk(risk_id):
    remove_risk(risk_id)
    return success_response("Riesgo eliminado exitosamente")

