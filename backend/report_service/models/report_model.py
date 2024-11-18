from database import get_db_connection

def create_report(user_id, software_id, evaluation_results, risk_results, pdf_path):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO reports (user_id, software_id, evaluation_results, risk_results, pdf_path)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (user_id, software_id, evaluation_results, risk_results, pdf_path)
        )
        connection.commit()
    connection.close()

def get_reports_by_user(user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM reports WHERE user_id = %s", (user_id,))
        reports = cursor.fetchall()
    connection.close()
    return reports
