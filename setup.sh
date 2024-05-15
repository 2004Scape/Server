#!/bin/bash

echo "Running npm ci..."
npm ci

if  [ ! -f .env ]; then
    echo "Copying default .env..."
    cp .env.example .env
fi

echo "Building..."
npm run build
