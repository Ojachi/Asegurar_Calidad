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
        cursor.execute("SELECT * FROM question")
        questions = cursor.fetchall()
    connection.close()
    return questions

def update_question(question_id, text):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "UPDATE question SET description = %s WHERE id = %s",
            (text, question_id)
        )
        connection.commit()
    connection.close()

def delete_question(question_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM question WHERE id = %s", (question_id,))
        connection.commit()
    connection.close()
