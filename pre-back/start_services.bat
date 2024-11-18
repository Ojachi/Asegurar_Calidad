@echo off
echo Iniciando auth_service...
start cmd /k "cd auth_service && python app.py"
timeout /t 2

echo Iniciando admin_service...
start cmd /k "cd admin_service && python app.py"
timeout /t 2

echo Iniciando evaluation_service...
start cmd /k "cd evaluation_service && python app.py"
timeout /t 2

echo Iniciando risk_service...
start cmd /k "cd risk_service && python app.py"
timeout /t 2

echo Iniciando report_service...
start cmd /k "cd report_service && python app.py"
timeout /t 2

echo Iniciando user_service...
start cmd /k "cd user_service && python app.py"
timeout /t 2

echo Iniciando API Gateway...
start cmd /k "cd gateway && python app.py"

echo Todos los servicios han sido iniciados.
pause
