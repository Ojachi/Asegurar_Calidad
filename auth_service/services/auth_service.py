from models.user import User
from utils.hash_utils import hash_password, check_password
from shared.utils import generate_jwt_token

def register_user(username, email, password):
    hashed_password = hash_password(password)
    user = User(username, email, hashed_password)
    User.create_user(user)
    return generate_jwt_token({'username': username, 'email': email})

def login_user(email, password):
    user = User.find_by_email(email)
    if not user or not check_password(password, user['password']):
        return None
    return generate_jwt_token({'username': user['username'], 'email': user['email'], 'role': user['role'], "user_id":user['id']})
