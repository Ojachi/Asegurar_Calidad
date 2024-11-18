from database import get_db_connection

def create_risk(software_id, description, phase, probability, impact, user_id):
    level = probability * impact
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO risks (software_id, description, phase, probability, impact, level, user_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (software_id, description, phase, probability, impact, level, user_id)
        )
        connection.commit()
    connection.close()

def get_risks_by_software(software_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM risks WHERE software_id = %s", (software_id,))
        risks = cursor.fetchall()
    connection.close()
    return risks

def delete_risk(risk_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM risks WHERE id = %s", (risk_id,))
        connection.commit()
    connection.close()
