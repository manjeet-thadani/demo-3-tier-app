FROM node:16.3.0-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json package-lock.json ./

# install packages
RUN npm install
COPY . /app 

EXPOSE 3000

CMD ["npm", "run", "start"]
