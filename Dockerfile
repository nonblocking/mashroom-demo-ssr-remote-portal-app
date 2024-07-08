FROM node:20.12.1-slim
WORKDIR /opt/app
COPY mashroom.json screenshot.png package.json package-lock.json ./
COPY ./dist ./dist
RUN npm ci --production
EXPOSE 6089
CMD ["node", "dist/server/index.js"]
