FROM node:16.18.0-slim
WORKDIR /opt/app
COPY mashroom.json screenshot.png package.json package-lock.json ./
COPY ./dist ./dist
RUN npm ci --production
EXPOSE 6089
CMD ["node", "dist/server/index.js"]
