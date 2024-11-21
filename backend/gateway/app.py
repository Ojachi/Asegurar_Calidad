from flask import Flask
from flask_cors import CORS
from routes import gateway_bp

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

app.register_blueprint(gateway_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
