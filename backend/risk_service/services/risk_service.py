from models.risk_model import create_risk, get_risks_by_user, fetch_risk_details, create_matrix
from database import get_db_connection
def add_risk(
    software_id,
    risks
):
    connection = get_db_connection()
    print("entra service")
    try:
        with connection.cursor() as cursor:
            matrix_id = create_matrix(cursor)
        
        
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

                # Enviar el riesgo al servicio
                print(matrix_id)
                
                create_risk(
                    cursor,
                    software_id,
                    description_risk,
                    fase_affected,
                    cause_root,
                    plan_mitigation,
                    probability,
                    impact,
                    probability_impact,
                    level_risk,
                    code,
                    matrix_id
                )

        connection.commit()
    except Exception as e:
        connection.rollback()
        raise e
    finally:
        connection.close()


def get_user_risks(user_id):
    return get_risks_by_user(user_id)

def get_risk_by_id(risk_id):
    return fetch_risk_details(risk_id)


