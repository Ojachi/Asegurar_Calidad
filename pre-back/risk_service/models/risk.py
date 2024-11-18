from shared.database import get_db_connection, close_db_connection

class Risk:
    def __init__(self, software_id, user_id, phase, risk_description, probability, impact, risk_level, evaluation_date):
        self.software_id = software_id
        self.user_id = user_id
        self.phase = phase
        self.risk_description = risk_description
        self.probability = probability
        self.impact = impact
        self.risk_level = risk_level
        self.evaluation_date = evaluation_date

    @staticmethod
    def create_risk(risk):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO risks (software_id, user_id, phase, risk_description, probability, impact, risk_level, evaluation_date)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (risk.software_id, risk.user_id, risk.phase, risk.risk_description, 
                                 risk.probability, risk.impact, risk.risk_level, risk.evaluation_date))
        close_db_connection(connection)

    @staticmethod
    def get_risks_by_software(software_id):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM risks WHERE software_id = %s"
            cursor.execute(sql, (software_id,))
            risks = cursor.fetchall()
        close_db_connection(connection)
        return risks
