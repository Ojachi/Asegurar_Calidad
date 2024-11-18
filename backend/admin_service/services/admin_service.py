from models.question_model import create_question, get_all_questions, update_question, delete_question

def add_question(text, model):
    create_question(text, model)
    return True

def get_questions():
    return get_all_questions()

def edit_question(question_id, text):
    update_question(question_id, text)
    return True

def remove_question(question_id):
    delete_question(question_id)
    return True
