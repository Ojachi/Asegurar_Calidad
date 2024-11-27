from models.software_model import create_software, get_software_by_user, delete_software, get_models, update_software

def register_software(user_id, name, version, description, developer, contact, company, date_register):
    create_software(user_id, name, version, description, developer, contact, company, date_register)
    return True

def get_user_software(user_id):
    return get_software_by_user(user_id)

def remove_software(software_id):
    delete_software(software_id)
    return True

def update_software_service(software_id, data):
    update_software(software_id, data)
    return True

def get_software_models():
    return get_models()
