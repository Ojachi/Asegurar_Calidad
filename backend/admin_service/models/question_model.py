from database import get_db_connection

def create_question(text, requirement):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO question (description, id_requirements) VALUES (%s, %s)",
            (text, requirement)         
        )
        connection.commit()
    connection.close()

def get_all_questions():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT q.id, q.description, r.name AS requirement_name, m.name AS model_name
            FROM question q
            JOIN requirements r ON q.id_requirements = r.id
            JOIN model m ON r.id_model = m.id
        """)
        questions = cursor.fetchall()
    connection.close()
    return questions

def get_models():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, name FROM model")
        models = cursor.fetchall()
    connection.close()
    return models

def get_requirements_by_model(model_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, name FROM requirements WHERE id_model = %s", (model_id,))
        requirements = cursor.fetchall()
    connection.close()
    return requirements

