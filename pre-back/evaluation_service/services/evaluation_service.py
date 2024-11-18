from models.evaluation import Evaluation

def add_evaluation(software_id, user_id, model, requirement, score, observation, evaluation_date):
    evaluation = Evaluation(software_id, user_id, model, requirement, score, observation, evaluation_date)
    Evaluation.create_evaluation(evaluation)
    return {"message": "Evaluación registrada con éxito"}

def get_evaluations(software_id):
    return Evaluation.get_evaluations_by_software(software_id)
