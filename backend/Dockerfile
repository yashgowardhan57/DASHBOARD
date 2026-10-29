# Production Dockerfile for PracticalOS Backend
FROM node:18-alpine

WORKDIR /app

# Copy backend dependencies
COPY package*.json ./
RUN npm install --production

# Copy backend services and code
COPY . .

# Expose backend port
EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]
