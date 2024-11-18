from flask import Flask
from controllers.evaluation_controller import evaluation_bp

app = Flask(__name__)
app.register_blueprint(evaluation_bp, url_prefix='/evaluation')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5003)
