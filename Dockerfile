FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre-headless

COPY package*.json ./

RUN npm i

# TODO consider using volumes/mounts for the source code + data
COPY . .

EXPOSE 80
EXPOSE 43594
EXPOSE 43595

CMD ["npm", "start"]

# TODO add dev mode
