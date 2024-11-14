from flask import request
from shared.utils import decode_jwt_token, response

def check_user():
    """Valida si el usuario tiene un token válido."""
    token = request.headers.get('Authorization')
    if not token or not token.startswith('Bearer '):
        return None

    token = token.split(' ')[1]
    user_data = decode_jwt_token(token)
    if not user_data:
        return None
    return user_data
