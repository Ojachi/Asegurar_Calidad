from flask import Blueprint, request, jsonify
from services.auth_service import register_user, authenticate_user
from utils import decode_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    id = data.get('cedula')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if register_user(id, username, email, password):
        return jsonify({"message": "Usuario registrado exitosamente"}), 201
    return jsonify({"error": "El usuario ya existe"}), 409

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    id = data.get('cedula')
    password = data.get('password')

    token, user = authenticate_user(id, password)
    print(user)
    if token:
        return jsonify({"token": token, "role": user['role'], "message": "Inicio de sesion exitoso"}), 200
    return jsonify({"error": "Credenciales inválidas"}), 401

@auth_bp.route('/verify', methods=['POST'])
def verify_token():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Token no proporcionado"}), 401

    token = token.replace("Bearer ", "")  # Quitar el prefijo "Bearer " del token
    verified = decode_access_token(token)
    
    if verified:
        return jsonify({"message": "Token válido", "user": verified}), 200
    else:
        return jsonify({"error": "Token inválido o expirado"}), 401

    

