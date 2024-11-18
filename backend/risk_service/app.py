from flask import Flask
from controllers.risk_controller import risk_bp

app = Flask(__name__)
app.register_blueprint(risk_bp, url_prefix='/risk')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5004)
