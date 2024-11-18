from flask import Blueprint, request, jsonify
from services.evaluation_service import add_evaluation, get_evaluations
from utils.auth_utils import check_user
from shared.utils import response
import datetime

evaluation_bp = Blueprint('evaluation', __name__)

@evaluation_bp.route('/evaluate', methods=['POST'])
def create_evaluation():
    user_data = check_user()
    if not user_data:
        return response("No autorizado", 403)

    data = request.json
    if not data or not all(k in data for k in ('software_id', 'model', 'requirement', 'score', 'observation')):
        return response("Datos incompletos", 400)
    
    evaluation_date = datetime.datetime.utcnow()
    result = add_evaluation(data['software_id'], user_data['user_id'], data['model'],
                            data['requirement'], data['score'], data['observation'], evaluation_date)
    return response(result['message'], 201)

@evaluation_bp.route('/evaluations/<software_id>', methods=['GET'])
def list_evaluations(software_id):
    user_data = check_user()
    if not user_data:
        return response("No autorizado", 403)

    evaluations = get_evaluations(software_id)
    return response("Lista de evaluaciones", 200, evaluations)
