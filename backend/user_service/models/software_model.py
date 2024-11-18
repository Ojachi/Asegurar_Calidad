from database import get_db_connection

def create_software(user_id, name, version, description, developer, contact, owner, license):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO software (user_id, name, version, description, developer, contact, owner, license)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (user_id, name, version, description, developer, contact, owner, license)
        )
        connection.commit()
    connection.close()

def get_software_by_user(user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM software WHERE user_id = %s", (user_id,))
        software_list = cursor.fetchall()
    connection.close()
    return software_list

def delete_software(software_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM software WHERE id = %s", (software_id,))
        connection.commit()
    connection.close()
