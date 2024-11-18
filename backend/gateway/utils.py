import requests
from flask import jsonify, request
from config import AUTH_SERVICE_URL

def handle_error(message, status_code):
    response = jsonify({"error": message})
    response.status_code = status_code
    return response

def success_response(data):
    return jsonify({"data": data})

def get_token():
    token = request.headers.get('Authorization')
    if not token:
        return None
    return token.replace("Bearer ", "")

def is_authenticated():
    token = get_token()
    if not token:
        return False
    try:
        response = requests.post(f"{AUTH_SERVICE_URL}/verify", headers={"Authorization": f"Bearer {token}"})
        return response.status_code == 200
    except:
        return False
