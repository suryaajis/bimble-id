# ========================================
# BIMBLE BACKEND - Express.js + Sequelize
# ========================================

FROM node:20-alpine

WORKDIR /app

# Install dependencies sistem untuk bcrypt & native modules
RUN apk add --no-cache python3 make g++

# Install dependencies (production only)
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]