from models.risk_model import create_risk, get_risks_by_software, delete_risk

def add_risk(software_id, description, phase, probability, impact, user_id):
    create_risk(software_id, description, phase, probability, impact, user_id)
    return True

def get_software_risks(software_id):
    return get_risks_by_software(software_id)

def remove_risk(risk_id):
    delete_risk(risk_id)
    return True

