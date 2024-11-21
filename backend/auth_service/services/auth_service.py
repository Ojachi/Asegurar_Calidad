import bcrypt
from models.user_model import create_user, get_user_by_id
from utils import create_access_token

def register_user(id,username, email, password):
    # Verificar si el usuario ya existe
    existing_user = get_user_by_id(id)
    if existing_user:
        return None

    # Hashear la contraseña
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    create_user(id, username, email, hashed_password)
    return True

def authenticate_user(id, password):
    user = get_user_by_id(id)
    if not user:
        return None

    # Verificar la contraseña
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return None

    # Generar un token JWT
    token = create_access_token({"cedula": user['id'], "email": user['email']})
    return token, {'role': user['role']}
