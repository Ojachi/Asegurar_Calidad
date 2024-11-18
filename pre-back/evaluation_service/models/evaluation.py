from shared.database import get_db_connection, close_db_connection

class Evaluation:
    def __init__(self, software_id, user_id, model, requirement, score, observation, evaluation_date):
        self.software_id = software_id
        self.user_id = user_id
        self.model = model
        self.requirement = requirement
        self.score = score
        self.observation = observation
        self.evaluation_date = evaluation_date

    @staticmethod
    def create_evaluation(evaluation):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO evaluations (software_id, user_id, model, requirement, score, observation, evaluation_date)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (evaluation.software_id, evaluation.user_id, evaluation.model,
                                 evaluation.requirement, evaluation.score, evaluation.observation,
                                 evaluation.evaluation_date))
        close_db_connection(connection)

    @staticmethod
    def get_evaluations_by_software(software_id):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM evaluations WHERE software_id = %s"
            cursor.execute(sql, (software_id,))
            evaluations = cursor.fetchall()
        close_db_connection(connection)
        return evaluations
