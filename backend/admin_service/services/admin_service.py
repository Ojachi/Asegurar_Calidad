from models.question_model import create_question, get_all_questions, get_models, get_requirements_by_model

def add_question(text, requirement):
    create_question(text, requirement)
    return True

def get_questions():
    return get_all_questions()

def get_all_models():
    return get_models()

def get_requirements_by_models(model_id):
    return get_requirements_by_model(model_id)
