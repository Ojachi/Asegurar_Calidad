from models.evaluation_model import create_result_requirement, create_result_model, get_evaluations_by_user, get_all_evaluations, get_all_questions, get_evaluation_details_model
from database import get_db_connection


def add_evaluation(software_id, model_id, results, model_result):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Guardar resultado del modelo
            model_result_id = create_result_model(
                cursor,
                model_id=model_id,
                id_software=software_id,
                porc_global=round(model_result['porcentaje_global_modelo'], 2),
                total_point=model_result['puntaje_total'],
                total_point_max=model_result['puntaje_maximo_posible']
            )

            # Guardar resultados de los requerimientos
            for result in results:
                create_result_requirement(
                    cursor,
                    id_result_model=model_result_id,
                    id_requirement=result['requirement_id'],  # Incluye el ID del requerimiento
                    value=result['puntaje_requerimiento'],
                    val_max=result['total_maximo_posible'],
                    porcentaje=result['porcentaje_global']
                )

        # Confirmar transacción
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise e
    finally:
        connection.close()


def get_user_evaluations(id_user):
    return get_evaluations_by_user(id_user)

def get_evaluation_details_service(evaluation_id):
    return get_evaluation_details_model(evaluation_id)

def get_all_user_evaluations():
    return get_all_evaluations()

def getQuestions(model_id):
    return get_all_questions(model_id)