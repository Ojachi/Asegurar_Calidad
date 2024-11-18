import pymysql
from pymysql.cursors import DictCursor
from .config import config

def get_db_connection():
    """Conecta a la base de datos MySQL y devuelve la conexión."""
    try:
        connection = pymysql.connect(
            host=config.DB_HOST,
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            database=config.DB_NAME,  # Usando 'calidad_BD'
            port=config.DB_PORT,
            cursorclass=DictCursor,
            autocommit=True
        )
        return connection
    except pymysql.MySQLError as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

def close_db_connection(connection):
    """Cierra la conexión a la base de datos."""
    if connection:
        connection.close()
