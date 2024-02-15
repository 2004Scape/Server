#!/bin/bash

echo "Running npm ci..."
npm ci

if  [ ! -f .env ]; then
    echo "Making .env..."
    cp .env.example .env
fi

if [ ! -f bz2.dll -o ! -f JagCompress.jar ]; then
    echo "Download and unzip jagcompress"
    github_release_url="https://api.github.com/repos/2004scape/JagCompress/releases/latest"
    curl -L -o jagcompress.zip $(curl -s $github_release_url | grep "browser_download_url" | awk '{ print $2 }' | sed 's/,$//' | sed 's/"//g')
    unzip -o jagcompress.zip
    rm jagcompress.zip
fi

echo "Running client:pack..."
npm run client:pack

echo "Running server:build..."
npm run server:build
