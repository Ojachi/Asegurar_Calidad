from database import get_db_connection


def create_matrix(cursor):

    cursor.execute(
        """
        INSERT INTO matrix (date_evaluation) VALUES (NOW())
        """
    )
    return cursor.lastrowid


def create_risk(
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

):

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
            code,
            id_matrix
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
            code,
            matrix_id
        )
    )
    print("sale de model risk")


# Obtener todas las matrices de riesgos de un usuario
def get_risks_by_user(user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT DISTINCT x.date_evaluation AS date_evaluation, x.id AS id_matrix,
                   s.name AS software_name
            FROM resul_matriz r
            JOIN matrix x ON r.id_matrix = x.id
            JOIN software s ON r.id_software = s.id
            JOIN user u ON s.id_user = u.id
            WHERE u.id = %s
            """,
            (user_id,)
        )
        risks = cursor.fetchall()
    connection.close()
    return risks

# Obtener detalles de una matriz específica


def fetch_risk_details(matrix_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT r.id, r.description_risk, r.fase_affected, r.cause_root, 
                   r.probability, r.impact, r.probability_impact, r.level_risk, 
                   r.plan_mitigatino, r.code
            FROM resul_matriz r
            WHERE r.id_matrix = %s
            """,
            (matrix_id,)
        )
        risk_details = cursor.fetchall()
    connection.close()
    return risk_details
