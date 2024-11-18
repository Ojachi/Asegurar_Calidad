from models.evaluation_model import create_evaluation, get_evaluations_by_user, get_all_evaluations

def add_evaluation(software_id, model, score, details, user_id):
    create_evaluation(software_id, model, score, details, user_id)
    return True

def get_user_evaluations(user_id):
    return get_evaluations_by_user(user_id)

def get_all_user_evaluations():
    return get_all_evaluations()
