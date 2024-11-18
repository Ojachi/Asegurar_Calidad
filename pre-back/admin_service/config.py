import os

class Config:
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_NAME = os.getenv('DB_NAME', 'calidad_BD')  # Nombre de la base de datos definido
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_secret_key')

config = Config()
