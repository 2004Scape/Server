FROM mcr.microsoft.com/devcontainers/typescript-node:0-18

ARG USERNAME=vscode
ARG USER_UID=2000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre-headless

RUN chown vscode:vscode /app
USER vscode