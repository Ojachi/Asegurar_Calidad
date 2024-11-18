from flask import Flask
from controllers.user_controller import user_bp

app = Flask(__name__)
app.register_blueprint(user_bp, url_prefix='/user')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5006)
