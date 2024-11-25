from flask import Blueprint, request
from services.evaluation_service import add_evaluation, get_user_evaluations, get_all_user_evaluations, getQuestions, get_evaluation_details_service
from utils import handle_error, success_response
from datetime import datetime

evaluation_bp = Blueprint('evaluation', __name__)

@evaluation_bp.route('/evaluate', methods=['POST'])
def create_evaluation():
    data = request.json 
    
    # Datos enviados desde el frontend
    id_software = data['id_software']
    id_model = data['id_model']
    results = data['results']  # Lista de resultados de requerimientos
    model_result = data['modelResult']  # Resultado global del modelo

    # Validación de datos
    if not all([id_software, id_model, results, model_result]):
        return handle_error("Faltan datos", 400)

    try:
        # Llamar al servicio para procesar los datos
        add_evaluation(id_software, id_model, results, model_result)
        return success_response("Evaluación guardada exitosamente")
    except Exception as e:
        return handle_error(f"Error al guardar la evaluación: {str(e)}", 500)

@evaluation_bp.route('/user-evaluations/<int:id_user>', methods=['GET'])
def list_user_evaluations(id_user):
    try:
        evaluations = get_user_evaluations(id_user)
        return success_response(evaluations)
    except Exception as e:
        return handle_error(f"Error al obtener evaluaciones: {str(e)}", 500)

@evaluation_bp.route('/evaluation-details/<int:evaluation_id>', methods=['GET'])
def get_evaluation_details(evaluation_id):
    try:
        details = get_evaluation_details_service(evaluation_id)
        return success_response(details)
    except Exception as e:
        return handle_error(f"Error al obtener detalles de evaluación: {str(e)}", 500)


@evaluation_bp.route('/all-evaluations', methods=['GET'])
def list_all_evaluations():
    evaluations = get_all_user_evaluations()
    return success_response(evaluations)

@evaluation_bp.route('/questions/<int:model_id>', methods=['GET'])
def get_Questions(model_id):
    questions = getQuestions(model_id)
    return success_response(questions)
