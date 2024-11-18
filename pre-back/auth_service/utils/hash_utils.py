import bcrypt

def hash_password(password):
    """Genera un hash seguro para la contraseña."""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed

def check_password(password, hashed):
    """Verifica si la contraseña ingresada coincide con el hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
