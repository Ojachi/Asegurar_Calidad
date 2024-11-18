from flask import request
from shared.utils import decode_jwt_token, response

def check_user():
    """Valida si el usuario tiene un token válido."""
    token = request.args.get('token')
    if not token:
        return None

    user_data = decode_jwt_token(token)
    if not user_data:
        return None
    return user_data
