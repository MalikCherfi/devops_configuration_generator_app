FROM node:24-alpine
WORKDIR /app

COPY package*.json ./
COPY package-lock.json ./
RUN npm install

COPY . /app

EXPOSE 3000
CMD ["npm", "run", "start"]