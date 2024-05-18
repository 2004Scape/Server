#!/bin/bash

echo "Installing node dependencies..."
npm i

if  [ ! -f .env ]; then
    echo "Copying default .env..."
    cp .env.example .env
fi

echo "Building..."
npm run build
