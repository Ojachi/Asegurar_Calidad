from shared.database import get_db_connection, close_db_connection

class Software:
    def __init__(self, user_id, name, version, description, developer, contact, owner, license):
        self.user_id = user_id
        self.name = name
        self.version = version
        self.description = description
        self.developer = developer
        self.contact = contact
        self.owner = owner
        self.license = license

    @staticmethod
    def create_software(software):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO software (user_id, name, version, description, developer, contact, owner, license)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(sql, (software.user_id, software.name, software.version, software.description,
                                 software.developer, software.contact, software.owner, software.license))
        close_db_connection(connection)

    @staticmethod
    def get_software_by_user(user_id):
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "SELECT * FROM software WHERE user_id = %s"
            cursor.execute(sql, (user_id,))
            software_list = cursor.fetchall()
        close_db_connection(connection)
        return software_list
