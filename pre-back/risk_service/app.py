import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask
from controllers.risk_controller import risk_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Registrar el Blueprint
app.register_blueprint(risk_bp, url_prefix='/risk')

if __name__ == "__main__":
    app.run(port=5004, debug=True)
