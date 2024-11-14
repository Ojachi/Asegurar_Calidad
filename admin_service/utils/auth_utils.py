from flask import request
from shared.utils import decode_jwt_token, response

def check_admin():
    """Valida si el usuario es administrador usando el token JWT."""
    token = request.headers.get('Authorization')
    if not token or not token.startswith('Bearer '):
        return None

    token = token.split(' ')[1]
    user_data = decode_jwt_token(token)
    if not user_data or user_data.get('role') != 'admin':
        return None
    return user_data
    