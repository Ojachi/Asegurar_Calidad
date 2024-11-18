from shared.database import get_db_connection, close_db_connection

class Question:
    def __init__(self, model, requirement, question_text, weight):
        self.model = model
        self.requirement = requirement
        self.question_text = question_text
        self.weight = weight

    @staticmethod
    def create_question(question):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO questions (model, requirement, question_text, weight) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (question.model, question.requirement, question.question_text, question.weight))
        close_db_connection(connection)

    @staticmethod
    def get_questions_by_model(model):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM questions WHERE model = %s"
            cursor.execute(sql, (model,))
            questions = cursor.fetchall()
        close_db_connection(connection)
        return questions

    @staticmethod
    def delete_question(question_id):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "DELETE FROM questions WHERE id = %s"
            cursor.execute(sql, (question_id,))
        close_db_connection(connection)
