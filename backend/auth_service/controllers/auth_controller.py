from flask import Blueprint, request, jsonify
from services.auth_service import register_user, authenticate_user

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if register_user(username, email, password):
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    return jsonify({"error": "El usuario ya existe"}), 409

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    token = authenticate_user(email, password)
    if token:
        return jsonify({"token": token}), 200
    return jsonify({"error": "Credenciales inválidas"}), 401
