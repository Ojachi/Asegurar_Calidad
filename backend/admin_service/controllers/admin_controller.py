from flask import Blueprint, request
from services.admin_service import add_question, get_questions, get_all_models, get_requirements_by_models
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

@admin_bp.route('/models', methods=['GET'])
def list_models():
    models = get_all_models()
    return success_response(models)

@admin_bp.route('/requirements/<int:model_id>', methods=['GET'])
def list_requirements(model_id):
    requirements = get_requirements_by_models(model_id)
    return success_response(requirements)


