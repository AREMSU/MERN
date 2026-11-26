# backend image: Node + Express API
FROM node:22-slim

WORKDIR /app

# copy package files first so Docker can cache the npm install layer
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 8000
CMD ["node", "index.js"]
