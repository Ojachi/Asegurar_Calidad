from database import get_db_connection

def create_question(text, model):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO questions (text, model) VALUES (%s, %s)",
            (text, model)
        )
        connection.commit()
    connection.close()

def get_all_questions():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM questions")
        questions = cursor.fetchall()
    connection.close()
    return questions

def update_question(question_id, text):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "UPDATE questions SET text = %s WHERE id = %s",
            (text, question_id)
        )
        connection.commit()
    connection.close()

def delete_question(question_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM questions WHERE id = %s", (question_id,))
        connection.commit()
    connection.close()
