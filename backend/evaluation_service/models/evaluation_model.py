from database import get_db_connection

def create_evaluation(software_id, model, score, details, user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO evaluations (software_id, model, score, details, user_id) VALUES (%s, %s, %s, %s, %s)",
            (software_id, model, score, details, user_id)
        )
        connection.commit()
    connection.close()

def get_evaluations_by_user(user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM evaluations WHERE user_id = %s", (user_id,))
        evaluations = cursor.fetchall()
    connection.close()
    return evaluations

def get_all_evaluations():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM evaluations")
        evaluations = cursor.fetchall()
    connection.close()
    return evaluations
