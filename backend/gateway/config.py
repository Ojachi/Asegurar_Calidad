import os

# Configuración de rutas para microservicios
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL", "http://localhost:5001/auth")
ADMIN_SERVICE_URL = os.getenv("ADMIN_SERVICE_URL", "http://localhost:5002/admin")
EVALUATION_SERVICE_URL = os.getenv("EVALUATION_SERVICE_URL", "http://localhost:5003/evaluation")
RISK_SERVICE_URL = os.getenv("RISK_SERVICE_URL", "http://localhost:5004/risk")
REPORT_SERVICE_URL = os.getenv("REPORT_SERVICE_URL", "http://localhost:5005/report")
USER_SERVICE_URL = os.getenv("USER_SERVICE_URL", "http://localhost:5006/user")
