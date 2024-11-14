import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask
from controllers.user_controller import user_bp
from flask_cors import CORS

app = Flask(__name__, template_folder='templates')
CORS(app)

# Registrar el Blueprint
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == "__main__":
    app.run(port=5006, debug=True)
