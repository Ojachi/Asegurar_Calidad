import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask
from controllers.admin_controller import admin_bp
from flask_cors import CORS

app = Flask(__name__, template_folder='templates')
CORS(app)

# Registrar el Blueprint
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == "__main__":
    app.run(port=5002, debug=True)
