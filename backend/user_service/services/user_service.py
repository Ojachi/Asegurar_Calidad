from models.software_model import create_software, get_software_by_user, delete_software

def register_software(user_id, name, version, description, developer, contact, owner, license):
    create_software(user_id, name, version, description, developer, contact, owner, license)
    return True

def get_user_software(user_id):
    return get_software_by_user(user_id)

def remove_software(software_id):
    delete_software(software_id)
    return True
