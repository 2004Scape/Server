@echo off
echo.

echo [INFO] Please wait.. This can take a minute..
docker-compose --profile prod up -d 
if %ERRORLEVEL% NEQ 0 (
    echo [!] Failed to start containers.. Something went wrong.. Stopping..
    docker-compose down
    pause
    exit /b %ERRORLEVEL%
)

echo [INFO] Services started successfully!

docker-compose rm -f db_migrate

echo.

echo [INFO] Done!

pause
