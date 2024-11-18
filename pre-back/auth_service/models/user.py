from shared.database import get_db_connection, close_db_connection

class User:
    def __init__(self, username, email, password, cedula, role='user' ):
        self.username = username
        self.email = email
        self.password = password
        self.cedula = cedula
        self.role = role
        

    @staticmethod
    def create_user(user):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "INSERT INTO users (username, email, password, id, role ) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (user.username, user.email, user.password, user.cedula, user.role))
        close_db_connection(connection)

    @staticmethod
    def find_by_id(id):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM users WHERE id = %s"
            cursor.execute(sql, (id,))
            user = cursor.fetchone()
        close_db_connection(connection)
        return user
