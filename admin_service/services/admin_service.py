from models.question import Question

def add_question(model, requirement, question_text, weight):
    question = Question(model, requirement, question_text, weight)
    Question.create_question(question)
    return {"message": "Pregunta añadida con éxito"}

def get_questions(model):
    return Question.get_questions_by_model(model)

def delete_question(question_id):
    Question.delete_question(question_id)
    return {"message": "Pregunta eliminada con éxito"}
