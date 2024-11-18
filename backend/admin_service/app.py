from flask import Flask
from controllers.admin_controller import admin_bp

app = Flask(__name__)
app.register_blueprint(admin_bp, url_prefix='/admin')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
