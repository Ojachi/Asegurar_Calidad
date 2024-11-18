from models.software import Software

def add_software(user_id, name, version, description, developer, contact, owner, license):
    software = Software(user_id, name, version, description, developer, contact, owner, license)
    Software.create_software(software)
    return {"message": "Software registrado con éxito"}

def get_user_software(user_id):
    return Software.get_software_by_user(user_id)
