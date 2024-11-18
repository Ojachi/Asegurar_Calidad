import os

class Config:
    # Configuración de los microservicios
    AUTH_SERVICE_URL = os.getenv('AUTH_SERVICE_URL', 'http://localhost:5001')
    ADMIN_SERVICE_URL = os.getenv('ADMIN_SERVICE_URL', 'http://localhost:5002')
    EVALUATION_SERVICE_URL = os.getenv('EVALUATION_SERVICE_URL', 'http://localhost:5003')
    RISK_SERVICE_URL = os.getenv('RISK_SERVICE_URL', 'http://localhost:5004')
    REPORT_SERVICE_URL = os.getenv('REPORT_SERVICE_URL', 'http://localhost:5005')
    USER_SERVICE_URL = os.getenv('USER_SERVICE_URL', 'http://localhost:5006')

    # Clave secreta para el Gateway (puedes cambiarla)
    SECRET_KEY = os.getenv('SECRET_KEY', 'your_gateway_secret_key')

config = Config()
