FROM node:8

WORKDIR /usr/src/app

# Install jq to parse JSON
RUN apt update \
  && apt install -y jq \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD nmp start
