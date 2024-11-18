from flask import request
from shared.utils import decode_jwt_token, response

def check_admin():
    """Valida si el usuario es administrador usando el token JWT."""
    token = request.args.get('token')
    if not token:
        return None

    user_data = decode_jwt_token(token)
    if not user_data or user_data.get('role') != 'admin':
        return None
    return user_data
    