from flask import Blueprint, request, jsonify
from services.admin_service import add_question, get_questions, delete_question
from utils.auth_utils import check_admin
from shared.utils import response

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/questions', methods=['POST'])
def create_question():
    user_data = check_admin()
    if not user_data:
        return response("No autorizado", 403)

    data = request.json
    if not data or not all(k in data for k in ('model', 'requirement', 'question_text', 'weight')):
        return response("Datos incompletos", 400)
    
    result = add_question(data['model'], data['requirement'], data['question_text'], data['weight'])
    return response(result['message'], 201)

@admin_bp.route('/questions/<model>', methods=['GET'])
def list_questions(model):
    user_data = check_admin()
    if not user_data:
        return response("No autorizado", 403)

    questions = get_questions(model)
    return response("Lista de preguntas", 200, questions)

@admin_bp.route('/questions/<int:question_id>', methods=['DELETE'])
def remove_question(question_id):
    user_data = check_admin()
    if not user_data:
        return response("No autorizado", 403)

    result = delete_question(question_id)
    return response(result['message'], 200)
    