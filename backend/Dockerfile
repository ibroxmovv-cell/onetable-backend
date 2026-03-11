# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# copy backend package manifests and install deps (ignore lifecycle scripts)
COPY backend/package*.json ./
RUN npm install --no-audit --no-fund --ignore-scripts

# copy backend source (tsconfig + src)
COPY backend/ ./

# build
RUN npm run build

# reduce image size
RUN npm prune --production

EXPOSE 4000

CMD ["node", "dist/main.js"]
