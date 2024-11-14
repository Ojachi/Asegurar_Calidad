from shared.database import get_db_connection, close_db_connection

class User:
    def __init__(self, username, email, password, role='user'):
        self.username = username
        self.email = email
        self.password = password
        self.role = role

    @staticmethod
    def create_user(user):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO users (username, email, password, role) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (user.username, user.email, user.password, user.role))
        close_db_connection(connection)

    @staticmethod
    def find_by_email(email):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE email = %s"
            cursor.execute(sql, (email,))
            user = cursor.fetchone()
        close_db_connection(connection)
        return user
