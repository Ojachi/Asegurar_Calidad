from models.risk import Risk

def calculate_risk_level(probability, impact):
    """Calcula el nivel de riesgo basado en la probabilidad y el impacto."""
    return probability * impact

def add_risk(software_id, user_id, phase, risk_description, probability, impact, evaluation_date):
    risk_level = calculate_risk_level(probability, impact)
    risk = Risk(software_id, user_id, phase, risk_description, probability, impact, risk_level, evaluation_date)
    Risk.create_risk(risk)
    return {"message": "Riesgo registrado con éxito", "risk_level": risk_level}

def get_risks(software_id):
    return Risk.get_risks_by_software(software_id)
