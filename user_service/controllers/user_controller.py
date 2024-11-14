from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from services.user_service import add_software, get_user_software
from utils.auth_utils import check_user
from shared.utils import response

user_bp = Blueprint('user', __name__)

@user_bp.route('/software', methods=['GET','POST'])
def register_software():
    # Validar el token usando la función check_user()
    user_data = check_user()
    print(user_data)
    if not user_data:
        # Si el token no es válido, redirigir al usuario al inicio de sesión
        return redirect("http://127.0.0.1:5001/auth/login")

    if request.method == 'GET':
        # Renderizar la página de registro si el token es válido
        return render_template('software_registration.html')

    # Si es un método POST, procesar el formulario de registro
    if request.method == 'POST':
        data = request.json
        if not data or not all(k in data for k in ('name', 'version', 'description', 'developer', 'contact', 'owner', 'license')):
            return response("Datos incompletos", 400)
        
        # Aquí deberías llamar a tu función de servicio para registrar el software
        result = add_software(user_data['user_id'], data['name'], data['version'], data['description'],
                              data['developer'], data['contact'], data['owner'], data['license'])
        return response(result['message'], 201)



# @user_bp.route('/software', methods=['GET'])
# def list_software():
#     user_data = check_user()
#     if not user_data:
#         return response("No autorizado", 403)

#     software_list = get_user_software(user_data['user_id'])
#     return response("Lista de software", 200, software_list)
