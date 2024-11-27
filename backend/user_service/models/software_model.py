from database import get_db_connection

def create_software(user_id, name, version, description, developer, contact, company, date_register):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            INSERT INTO software (id_user, name, version, description, name_development, phone_development, company, date_register)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (user_id, name, version, description, developer, contact, company, date_register)
        )
        connection.commit()
    connection.close()

def get_software_by_user(user_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM software WHERE id_user = %s  AND state = 1", (user_id))
        software_list = cursor.fetchall()
    connection.close()
    return software_list

def delete_software(software_id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("UPDATE software SET state = 0 WHERE id = %s", (software_id,))
        connection.commit()
    connection.close()

def update_software(software_id, data):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            """
            UPDATE software 
            SET name = %s, version = %s, description = %s, 
                name_development = %s, phone_development = %s, 
                company = %s 
            WHERE id = %s
            """,
            (
                data['name'], data['version'], data['description'], 
                data['name_development'], data['phone_development'], 
                data['company'], software_id
            )
        )
        connection.commit()
    connection.close()


def get_models():
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM model")
        model_list = cursor.fetchall()
    connection.close()
    return model_list