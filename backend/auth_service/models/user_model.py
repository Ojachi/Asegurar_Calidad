from database import get_db_connection

def create_user(username, email, password_hash):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, password_hash)
        )
        connection.commit()
    connection.close()

def get_user_by_email(email):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
    connection.close()
    return user
