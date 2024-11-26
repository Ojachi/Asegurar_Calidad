from database import get_db_connection

def create_risk(
    software_id, 
    description_risk, 
    fase_affected, 
    cause_root, 
    plan_mitigation, 
    probability, 
    impact, 
    probability_impact, 
    level_risk,
    code
):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO resul_matriz (
                id_software, 
                description_risk, 
                fase_affected, 
                cause_root, 
                plan_mitigatino, 
                probability, 
                impact, 
                probability_impact, 
                level_risk,
                code
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                software_id,
                description_risk,
                fase_affected,
                cause_root,
                plan_mitigation,
                probability,
                impact,
                probability_impact,
                level_risk,
                code
            )
        )
        connection.commit()
    connection.close()


# Obtener todas las matrices de riesgos de un usuario
def get_risks_by_user(user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT r.id, r.description_risk, r.fase_affected, r.cause_root, 
                   r.probability, r.impact, r.probability_impact, r.level_risk, 
                   s.name AS software_name
            FROM resul_matriz r
            JOIN software s ON r.id_software = s.id
            WHERE s.id_user = %s
            """, 
            (user_id,)
        )
        risks = cursor.fetchall()
    connection.close()
    return risks

# Obtener detalles de una matriz específica
def fetch_risk_details(risk_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT r.id, r.description_risk, r.fase_affected, r.cause_root, 
                   r.probability, r.impact, r.probability_impact, r.level_risk, 
                   r.plan_mitigatino, r.code
            FROM resul_matriz r
            WHERE r.id = %s
            """, 
            (risk_id,)
        )
        risk_details = cursor.fetchall()
    connection.close()
    return risk_details

