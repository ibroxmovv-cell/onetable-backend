# backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# 1) copy package manifests from the build context root (if Dockerfile used at backend folder, context is repo root)
COPY package*.json ./

# 2) install dependencies but ignore lifecycle scripts (postinstall)
RUN npm install --no-audit --no-fund --ignore-scripts

# 3) copy everything from the build context into the container working dir
COPY . .

# 4) build TypeScript now that tsconfig.json and src/ exist
RUN npm run build

# 5) remove dev deps to shrink image (optional)
RUN npm prune --production

EXPOSE 4000

CMD ["node", "dist/main.js"]
