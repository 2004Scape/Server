#!/bin/bash
clear
echo ""
echo "[INFO] Please wait.. This can take a minute.."

docker-compose --profile prod up -d

if [ $? -ne 0 ]; then
    echo "[!] Failed to start containers.. Something went wrong.. Stopping.."
    docker-compose down
    read -p "Press Enter to exit..."
    exit $?
fi

echo "[INFO] Services started successfully!"

docker-compose rm -f db_migrate

echo ""
echo "[INFO] Done!"

read -p "Press Enter to exit..."
