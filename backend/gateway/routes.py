import requests
from flask import Blueprint, request, jsonify
from utils import handle_error, success_response, is_authenticated
from config import AUTH_SERVICE_URL, ADMIN_SERVICE_URL, EVALUATION_SERVICE_URL, RISK_SERVICE_URL, REPORT_SERVICE_URL, USER_SERVICE_URL

gateway_bp = Blueprint('gateway', __name__)

# Rutas para el servicio de autenticación


@gateway_bp.route('/auth/<path:path>', methods=['GET', 'POST'])
def auth_service(path):
    response = requests.request(
        method=request.method,
        url=f"{AUTH_SERVICE_URL}/{path}",
        json=request.json,
        headers=request.headers
    )
    print(response.json())
    return jsonify(response.json()), response.status_code

# Rutas para el servicio de administración


@gateway_bp.route('/admin/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def admin_service(path):
    if not is_authenticated():
        return handle_error("No autorizado", 401)

    if request.method == 'GET':
        response = requests.request(
            method=request.method,
            url=f"{ADMIN_SERVICE_URL}/{path}"
        )
    else:
        response = requests.request(
            method=request.method,
            url=f"{ADMIN_SERVICE_URL}/{path}",
            json=request.json,
            headers=request.headers
        )

    return response.json(), response.status_code

# Rutas para el servicio de evaluación


@gateway_bp.route('/evaluation/<path:path>', methods=['GET', 'POST'])
def evaluation_service(path):
    if not is_authenticated():
        return handle_error("No autorizado", 401)

    if request.method == 'GET':
        response = requests.request(
            method=request.method,
            url=f"{EVALUATION_SERVICE_URL}/{path}"
        )
    else:
        response = requests.request(
            method=request.method,
            url=f"{EVALUATION_SERVICE_URL}/{path}",
            json=request.json,
            headers=request.headers
        )
    return jsonify(response.json()), response.status_code

# Rutas para el servicio de riesgos


@gateway_bp.route('/risk/<path:path>', methods=['GET', 'POST', 'DELETE'])
def risk_service(path):
    if not is_authenticated():
        return handle_error("No autorizado", 401)

    if request.method == 'GET':
        response = requests.request(
            method=request.method,
            url=f"{RISK_SERVICE_URL}/{path}"
        )
    else:
        response = requests.request(
            method=request.method,
            url=f"{RISK_SERVICE_URL}/{path}",
            json=request.json,
            headers=request.headers
        )
    return jsonify(response.json()), response.status_code

# Rutas para el servicio de reportes
@gateway_bp.route('/report/<path:path>', methods=['GET', 'POST'])
def report_service(path):
    if not is_authenticated():
        return handle_error("No autorizado", 401)

    response = requests.request(
        method=request.method,
        url=f"{REPORT_SERVICE_URL}/{path}",
        json=request.json,
        headers=request.headers
    )
    return jsonify(response.json()), response.status_code

# Rutas para el servicio de usuarios
@gateway_bp.route('/user/<path:path>', methods=['GET', 'POST', 'DELETE'])
def user_service(path):
    if not is_authenticated():
        return handle_error("No autorizado", 401)
    
    if request.method == 'GET':
        response = requests.request(
            method=request.method,
            url=f"{USER_SERVICE_URL}/{path}"
        )
    else:
        response = requests.request(
            method=request.method,
            url=f"{USER_SERVICE_URL}/{path}",
            json=request.json,
            headers=request.headers
        )
    return jsonify(response.json()), response.status_code
