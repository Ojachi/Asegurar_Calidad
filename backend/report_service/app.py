from flask import Flask
from controllers.report_controller import report_bp

app = Flask(__name__)
app.register_blueprint(report_bp, url_prefix='/report')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5005)
