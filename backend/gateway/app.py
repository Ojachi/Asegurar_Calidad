from flask import Flask
from routes import gateway_bp

app = Flask(__name__)
app.register_blueprint(gateway_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)