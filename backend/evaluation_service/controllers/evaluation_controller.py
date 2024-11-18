from flask import Blueprint, request
from services.evaluation_service import add_evaluation, get_user_evaluations, get_all_user_evaluations
from utils import handle_error, success_response

evaluation_bp = Blueprint('evaluation', __name__)

@evaluation_bp.route('/evaluate', methods=['POST'])
def create_evaluation():
    data = request.json
    software_id = data.get('software_id')
    model = data.get('model')
    score = data.get('score')
    details = data.get('details')
    user_id = data.get('user_id')

    if not all([software_id, model, score, details, user_id]):
        return handle_error("Faltan datos", 400)

    add_evaluation(software_id, model, score, details, user_id)
    return success_response("Evaluación guardada exitosamente")

@evaluation_bp.route('/user-evaluations/<int:user_id>', methods=['GET'])
def list_user_evaluations(user_id):
    evaluations = get_user_evaluations(user_id)
    return success_response(evaluations)

@evaluation_bp.route('/all-evaluations', methods=['GET'])
def list_all_evaluations():
    evaluations = get_all_user_evaluations()
    return success_response(evaluations)
