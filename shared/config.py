import os

class Config:
    # Configuración de la base de datos MySQL (usando XAMPP)
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_NAME = os.getenv('DB_NAME', 'calidad_db')  # Actualizado con el nuevo nombre de la base de datos

    # Configuración del Secret Key para JWT
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES', 360000))

    # Otros ajustes generales
    DEBUG = os.getenv('DEBUG', True)
    PORT = int(os.getenv('PORT', 5000))

config = Config()
