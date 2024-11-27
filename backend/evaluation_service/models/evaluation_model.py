from database import get_db_connection


def create_result_model(cursor, model_id, id_software, porc_global, total_point, total_point_max):
    """
    Inserta un registro en la tabla result_model y devuelve el ID generado.
    """
    cursor.execute(
        """
        INSERT INTO result_model (
            date_evaluation, id_model, id_software, porc_global, total_point, total_point_max
        )
        VALUES (NOW(), %s, %s, %s, %s, %s)
        """,
        (model_id, id_software, porc_global, total_point, total_point_max)
    )
    return cursor.lastrowid  # Devolver el ID generado


def create_result_requirement(cursor, id_result_model, id_requirement, value, val_max, porcentaje):
    """
    Inserta un registro en la tabla result_requirement relacionado con un modelo.
    """
    cursor.execute(
        """
        INSERT INTO result_requirements (id_result_model, id_requirement, value, val_max, porcentaje)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (id_result_model, id_requirement, value, val_max, porcentaje)
    )



def get_evaluations_by_user(id_user):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT 
                rm.id AS evaluation_id,
                s.name AS software_name,
                m.name AS model_name,
                rm.date_evaluation,
                rm.total_point,
                rm.porc_global,
                rm.total_point_max
            FROM 
                result_model rm
            JOIN 
                software s ON rm.id_software = s.id
            JOIN 
                model m ON rm.id_model = m.id
            WHERE 
                s.id_user = %s
            ORDER BY 
                rm.date_evaluation DESC
            """,
            (id_user,)
        )
        evaluations = cursor.fetchall()
    connection.close()
    return evaluations

def get_evaluation_details_model(evaluation_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT 
                rr.id AS requirement_id,
                r.name AS requirement_name,
                r.description AS requirement_description,
                r.requirement_percentage AS requirement_percentage,
                rr.value,
                rr.val_max,
                rr.porcentaje
            FROM 
                result_requirements rr
            JOIN 
                requirements r ON rr.id_requirement = r.id
            WHERE 
                rr.id_result_model = %s
            """,
            (evaluation_id,)
        )
        requirements = cursor.fetchall()

        cursor.execute(
            """
            SELECT 
                rm.total_point, 
                rm.total_point_max, 
                rm.porc_global 
            FROM 
                result_model rm 
            WHERE 
                rm.id = %s
            """,
            (evaluation_id,)
        )
        model_data = cursor.fetchone()

    connection.close()

    return {
        "requirements": requirements,
        "total_score": model_data["total_point"],
        "total_max_score": model_data["total_point_max"],
        "global_percentage": model_data["porc_global"]
    }

def get_all_evaluations():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM evaluations")
        evaluations = cursor.fetchall()
    connection.close()
    return evaluations


def get_all_questions(model_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT r.id AS requirement_id, r.name AS requirement_name, r.description AS requirement_description, r.requirement_percentage AS requirement_percentage , q.id AS question_id, q.description AS question_text FROM requirements r LEFT JOIN question q ON r.id=q.id_requirements WHERE r.id_model=%s", (model_id))
        questions = cursor.fetchall()
    
    # Procesar los datos para agrupar preguntas por requerimiento
    requirements = {}
    for row in questions:
        req_id = row["requirement_id"]
        if req_id not in requirements:
            requirements[req_id] = {
                "requirement_id": req_id,
                "requirement_name": row["requirement_name"],
                "requirement_description": row["requirement_description"],
                "requirement_percentage": row["requirement_percentage"],
                "questions": []
            }
        if row["question_id"]:  # Verifica si hay preguntas
            requirements[req_id]["questions"].append({
                "question_id": row["question_id"],
                "question_text": row["question_text"]
            })
            
    connection.close()
    # Convertir a una lista para devolver
    return list(requirements.values())
