import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask
from controllers.auth_controller import auth_bp
from flask_cors import CORS



app = Flask(__name__, template_folder='templates')
CORS(app)

# Registrar los Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == "__main__":
    app.run(port=5001, debug=True)
