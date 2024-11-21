from flask import Blueprint, request
from services.admin_service import add_question, get_questions, edit_question, remove_question
from utils import handle_error, success_response

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/questions', methods=['GET'])
def list_questions():
    questions = get_questions()
    if (questions):
        return questions, 200
    else: 
        return handle_error("No hay preguntas registradas", 404)

@admin_bp.route('/questions', methods=['POST'])
def create_question():
    data = request.json
    description = data.get('description')
    requirement = data.get('requirement')

    if not description or not requirement:
        return handle_error("Faltan datos", 400)

    add_question(description, requirement)
    return success_response("Pregunta creada exitosamente")

@admin_bp.route('/questions/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.json
    text = data.get('text')

    if not text:
        return handle_error("Faltan datos", 400)

    edit_question(question_id, text)
    return success_response("Pregunta actualizada exitosamente")

@admin_bp.route('/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    remove_question(question_id)
    return success_response("Pregunta eliminada exitosamente")
