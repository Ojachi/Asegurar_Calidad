from flask import Blueprint, request, jsonify ,render_template, redirect, url_for
from services.auth_service import register_user, login_user
from shared.utils import response

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['GET','POST' ])
def register():
    if request.method == 'GET':
        return render_template('login.html')
    
    data = request.json
    if not data or not all(k in data for k in ('username', 'email', 'password')):
        return response("Datos incompletos", 400)
    
    token = register_user(data['username'], data['email'], data['password'])
    return response("Usuario registrado con éxito", 201, {'token': token})

@auth_bp.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    
    data = request.json   
    if not data or not all(k in data for k in ('email', 'password')):
        return response("Datos incompletos", 400)
    token = login_user(data['email'], data['password'])
    if not token:
        return response("Credenciales incorrectas", 401)
    
    return response("Inicio de sesión exitoso", 200, {'token': token})
