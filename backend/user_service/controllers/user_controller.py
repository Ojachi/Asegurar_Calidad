from flask import Blueprint, request
from services.user_service import register_software, get_user_software, remove_software
from utils import handle_error, success_response
from datetime import datetime

user_bp = Blueprint('user', __name__)

@user_bp.route('/software', methods=['POST'])
def create_software():
    data = request.json
    print(data)
    user_id = data.get('user_id')
    company = data.get('company')
    name = data.get('name')
    version = data.get('version')
    description = data.get('description')
    developer = data.get('developer')
    contact = data.get('contact')
    date_register = datetime.now()

    if not all([user_id, name, version, description, developer, contact, company, date_register]):
        return handle_error("Faltan datos", 400)

    register_software(user_id, name, version, description, developer, contact, company, date_register)
    return success_response("Software registrado exitosamente")

@user_bp.route('/software/<int:user_id>', methods=['GET'])
def list_software(user_id):
    software_list = get_user_software(user_id)
    return success_response(software_list)

@user_bp.route('/software/<int:software_id>', methods=['DELETE'])
def delete_software(software_id):
    remove_software(software_id)
    return success_response("Software eliminado exitosamente")
