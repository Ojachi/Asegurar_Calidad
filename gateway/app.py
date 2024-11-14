import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from flask import Flask, request, jsonify
import requests
from config import config
from shared.utils import extract_jwt_from_request, decode_jwt_token, response

app = Flask(__name__)

# Habilitar CORS para evitar problemas de origen cruzado
from flask_cors import CORS
CORS(app)

# Redirigir al Auth Service para el login
@app.route('/auth/login', methods=['POST'])
def login():
    auth_response = requests.post(f"{config.AUTH_SERVICE_URL}/login", json=request.json)
    return jsonify(auth_response.json()), auth_response.status_code

# Redirigir al Auth Service para el registro de usuarios
@app.route('/auth/register', methods=['POST'])
def register():
    register_response = requests.post(f"{config.AUTH_SERVICE_URL}/register", json=request.json)
    return jsonify(register_response.json()), register_response.status_code

# Rutas protegidas que requieren autenticación
@app.route('/admin/questions', methods=['GET', 'POST'])
def admin_questions():
    token = extract_jwt_from_request()
    if not token:
        return response("Unauthorized", status=401)

    user_data = decode_jwt_token(token)
    if not user_data or user_data['role'] != 'admin':
        return response("Forbidden", status=403)
    
    if request.method == 'GET':
        questions_response = requests.get(f"{config.ADMIN_SERVICE_URL}/questions")
        return jsonify(questions_response.json()), questions_response.status_code
    elif request.method == 'POST':
        questions_response = requests.post(f"{config.ADMIN_SERVICE_URL}/questions", json=request.json)
        return jsonify(questions_response.json()), questions_response.status_code

@app.route('/evaluation/start', methods=['POST'])
def start_evaluation():
    token = extract_jwt_from_request()
    if not token:
        return response("Unauthorized", status=401)

    user_data = decode_jwt_token(token)
    if not user_data:
        return response("Unauthorized", status=401)

    evaluation_response = requests.post(f"{config.EVALUATION_SERVICE_URL}/start", json=request.json)
    return jsonify(evaluation_response.json()), evaluation_response.status_code

@app.route('/risk/evaluate', methods=['POST'])
def evaluate_risks():
    token = extract_jwt_from_request()
    if not token:
        return response("Unauthorized", status=401)

    user_data = decode_jwt_token(token)
    if not user_data:
        return response("Unauthorized", status=401)

    risk_response = requests.post(f"{config.RISK_SERVICE_URL}/evaluate", json=request.json)
    return jsonify(risk_response.json()), risk_response.status_code

@app.route('/report/generate', methods=['GET'])
def generate_report():
    token = extract_jwt_from_request()
    if not token:
        return response("Unauthorized", status=401)

    user_data = decode_jwt_token(token)
    if not user_data:
        return response("Unauthorized", status=401)

    report_response = requests.get(f"{config.REPORT_SERVICE_URL}/generate", params=request.args)
    return jsonify(report_response.json()), report_response.status_code

if __name__ == "__main__":
    app.run(port=5000, debug=True)
