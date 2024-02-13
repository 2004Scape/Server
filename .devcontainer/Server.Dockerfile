FROM mcr.microsoft.com/devcontainers/typescript-node:0-18

ARG USERNAME=vscode
ARG USER_UID=2000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.example .env

RUN curl -L -o jagcompress.zip $(curl -s https://api.github.com/repos/2004scape/JagCompress/releases/latest | grep "zipball_url" | awk '{ print $2 }' | sed 's/,$//' | sed 's/"//g')
RUN unzip jagcompress.zip

RUN apt-get update && apt-get install -y openjdk-17-jre-headless

RUN npm ci
RUN npm run client:pack
RUN npm run server:build
