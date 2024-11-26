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
    
    print(data)

    if not software_id or not risks or not isinstance(risks, list):
        return handle_error("Faltan datos o el formato es incorrecto", 400)

    # Procesar cada riesgo en el array
    try:
        for risk in risks:
            description_risk = risk.get('description')
            fase_affected = risk.get('fase')
            cause_root = risk.get('cause')
            plan_mitigation = risk.get('contingency')
            probability = int(risk.get('probability', 0))
            impact = int(risk.get('impact', 0))
            probability_impact = int(risk.get('probabilityImpact', 0))
            level_risk = risk.get('levelRisk')
            code = risk.get('code')

            # Validar campos necesarios en cada riesgo
            if not all([description_risk, fase_affected, cause_root, probability, impact, level_risk, probability_impact, code]):
                return handle_error(f"Faltan datos en uno de los riesgos: {risk}", 400)

            # Enviar el riesgo al servicio
            add_risk(
                software_id=software_id,
                description_risk=description_risk,
                fase_affected=fase_affected,
                cause_root=cause_root,
                plan_mitigation=plan_mitigation,
                probability=probability,
                impact=impact,
                probability_impact=probability_impact,
                level_risk=level_risk,
                code=code
            )

        return success_response("Riesgos creados exitosamente")
    except Exception as e:
        return handle_error(f"Error al guardar los riesgos: {str(e)}", 500)



@risk_bp.route('/user-risks/<int:user_id>', methods=['GET'])
def list_user_risks(user_id):
    print(user_id)
    risks = get_user_risks(user_id)  # Llama al servicio para obtener las matrices de riesgos del usuario
    return success_response(risks)

@risk_bp.route('/risk-details/<int:risk_id>', methods=['GET'])
def get_risk_details(risk_id):
    risk_details = get_risk_by_id(risk_id)  # Llama al servicio para obtener detalles de una matriz específica
    return success_response(risk_details)



