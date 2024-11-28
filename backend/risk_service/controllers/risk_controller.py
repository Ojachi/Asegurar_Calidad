from flask import Blueprint, request
from services.risk_service import add_risk, get_risk_by_id, get_user_risks
from utils import handle_error, success_response

risk_bp = Blueprint('risk', __name__)

@risk_bp.route('/risks', methods=['POST'])
def create_risk():
    data = request.json
    
    # Extraer el id del software y el array de riesgos
    software_id = data.get('softwareId')
    risks = data.get('riskItems')  # Array de riesgos

    if not software_id or not risks or not isinstance(risks, list):
        return handle_error("Faltan datos o el formato es incorrecto", 400)

    # Procesar cada riesgo en el array
    try:
        # Llamar al servicio para procesar los datos
        add_risk(software_id, risks)
        return success_response("Matriz guardada exitosamente")
    except Exception as e:
        return handle_error(f"Error al guardar la matriz: {str(e)}", 500)



@risk_bp.route('/user-risks/<int:user_id>', methods=['GET'])
def list_user_risks(user_id):
    risks = get_user_risks(user_id)
    print(risks) # Llama al servicio para obtener las matrices de riesgos del usuario
    return success_response(risks)

@risk_bp.route('/risk-details/<int:risk_id>', methods=['GET'])
def get_risk_details(risk_id):
    risk_details = get_risk_by_id(risk_id)  # Llama al servicio para obtener detalles de una matriz específica
    return success_response(risk_details)



