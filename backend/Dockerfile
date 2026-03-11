FROM node:18-alpine

WORKDIR /usr/src/app

# 1) copy package manifests for caching
COPY package*.json ./

# 2) install dependencies but DO NOT run lifecycle scripts yet
# Use npm install because package-lock.json may be absent in repo
RUN npm install --no-audit --no-fund --ignore-scripts

# 3) copy the rest of the source (tsconfig.json, src/, etc.)
COPY . .

# 4) run the TypeScript build now that sources are present
RUN npm run build

# 5) remove dev dependencies to shrink image (optional)
RUN npm prune --production

EXPOSE 4000

CMD ["node", "dist/main.js"]
