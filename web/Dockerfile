FROM node:18-alpine3.15
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "prod"]
EXPOSE 3000