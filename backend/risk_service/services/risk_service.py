from models.risk_model import create_risk, get_risks_by_user, fetch_risk_details

def add_risk(
    software_id, 
    description_risk, 
    fase_affected, 
    cause_root, 
    plan_mitigation, 
    probability, 
    impact, 
    probability_impact, 
    level_risk,
    code
):
    create_risk(
        software_id=software_id,
        description_risk=description_risk,
        fase_affected=fase_affected,
        cause_root=cause_root,
        plan_mitigation=plan_mitigation,
        probability=probability,
        impact=impact,
        probability_impact=probability_impact,
        level_risk=level_risk,
        code=code
    )
    return True


def get_user_risks(user_id):
    return get_risks_by_user(user_id)

def get_risk_by_id(risk_id):
    return fetch_risk_details(risk_id)


