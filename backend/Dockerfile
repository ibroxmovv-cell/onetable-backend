FROM node:18-alpine

WORKDIR /usr/src/app

# 1) copy only package files to leverage Docker cache for dependencies
COPY package*.json ./

# 2) install dependencies (will run postinstall if exists, so we avoid that by using --ignore-scripts)
# Use --ignore-scripts to prevent postinstall from running before source is copied.
RUN npm ci --ignore-scripts

# 3) copy rest of the source (tsconfig.json, src/, etc.)
COPY . .

# 4) run the build now that all source files (tsconfig.json) are present
RUN npm run build

# 5) optionally run npm prune --production to reduce size
RUN npm prune --production

EXPOSE 4000

CMD ["node", "dist/main.js"]
