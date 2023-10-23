FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre

COPY package*.json ./

RUN npm ci

# TODO consider using volumes/mounts for the source code + data
COPY . .

EXPOSE 80
EXPOSE 43594
EXPOSE 43595

CMD ["npm", "start"]

# TODO add dev mode
