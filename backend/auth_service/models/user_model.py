from database import get_db_connection

def create_user(id, username, email, hashed_password):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO user (id, username, email, password) VALUES (%s, %s, %s, %s)",
            (id, username, email, hashed_password)
        )
        connection.commit()
    connection.close()

def get_user_by_id(id):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM user WHERE id = %s", (id,))
        user = cursor.fetchone()
    connection.close()
    return user
