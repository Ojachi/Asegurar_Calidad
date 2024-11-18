import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask
from controllers.evaluation_controller import evaluation_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Registrar el Blueprint
app.register_blueprint(evaluation_bp, url_prefix='/evaluation')

if __name__ == "__main__":
    app.run(port=5003, debug=True)
