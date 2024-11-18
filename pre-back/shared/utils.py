import jwt
import datetime
from flask import jsonify, request
from .config import config

def generate_jwt_token(data):
    """Genera un token JWT que expira después de un tiempo definido."""
    try:
        expiration = datetime.datetime.utcnow() + datetime.timedelta(seconds=config.JWT_ACCESS_TOKEN_EXPIRES)
        token = jwt.encode(
            {'data': data, 'exp': expiration},
            config.JWT_SECRET_KEY,
            algorithm='HS256'
        )
        return token
    except Exception as e:
        print(f"Error al generar el token JWT: {e}")
        return None

def decode_jwt_token(token):
    """Decodifica un token JWT y devuelve los datos si es válido."""
    try:
        decoded = jwt.decode(token, config.JWT_SECRET_KEY, algorithms=['HS256'])
        return decoded['data']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def extract_jwt_from_request():
    """Extrae el token JWT de la cabecera de autorización del request."""
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        return auth_header.split(' ')[1]
    return None

def response(message, status=200, data=None):
    """Genera una respuesta JSON estándar."""
    response_data = {
        'message': message,
        'data': data
    }
    return jsonify(response_data), status

def unauthorized_response():
    """Genera una respuesta para accesos no autorizados."""
    return response('Unauthorized access', 401)
