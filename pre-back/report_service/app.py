import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask
from controllers.report_controller import report_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Registrar el Blueprint
app.register_blueprint(report_bp, url_prefix='/report')

if __name__ == "__main__":
    app.run(port=5005, debug=True)
